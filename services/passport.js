const passport = require("passport");
const MagicStrategy = require("passport-magic").Strategy;
const { Magic } = require("@magic-sdk/admin");
const mongoose = require("mongoose");

const User = mongoose.model("users");
const keys = require("../config/keys");

//defines what data are stored in user session and generates a cookie
passport.serializeUser((user, done) => {
  done(null, user.issuer);
});

//populates user data in the req.user object
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ issuer: id });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

const magic = new Magic(keys.MAGIC_SECRET_KEY);

const magicStrategy = new MagicStrategy(async function (user, done) {
  const userMetaData = await magic.users.getMetadataByIssuer(user.issuer);
  const existingUser = await User.findOne({ issuer: user.issuer });
  if (!existingUser) {
    return signup(user, userMetaData, done);
  } else {
    return login(user, done);
  }
});

passport.use(magicStrategy);

//User Sign UP (FIRST TIME USER)
const signup = async (user, userMetaData, done) => {
  const newUser = await new User({
    issuer: user.issuer,
    email: userMetaData.email,
    lastLogingAt: user.claim.iat,
  }).save();
  return done(null, newUser);
};

//User Login (RETURNING USER)
const login = async (user, done) => {
  // replay attack protection
  if (user.claim.iat <= user.lastLogingAt) {
    return done(null, false, {
      message: `Replay attack detected for user ${user.issuer}`,
    });
  }
  await User.findOneAndUpdate(
    { issuer: user.issuer },
    { lastLogingAt: user.claim.iat },
    { new: true }
  );

  return done(null, user);
};
