const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Users = require("../../src/Schemas/UserSchema");
const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");


// Authenticate by local strategy for the first time
passport.use(new LocalStrategy( 
  {

    usernameField : 'email',

    passwordField : 'password',

},
Users.authenticate()
));

// Authenticate by jwt strategy
passport.use(
  new jwtStrategy(
    {
      jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:process.env.MONGO_SECRET
    },
    (payload, done) => {
      Users.findById(payload._id, (err, user) => {
        if (err) return done(err);
        done(null, user);
      });
    }
  )
);

// get tokken
module.exports.getToken = (user, expiresIn = 36000) =>
  jwt.sign(user,process.env.MONGO_SECRET, { expiresIn: expiresIn });

// verify user 
module.exports.verifyUser = passport.authenticate("jwt",{session:false})
