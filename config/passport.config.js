const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const getDb = require('./database')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
}
const initialize = async passport => {
  const db = await getDb()
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      console.log(jwt_payload)
      try {
        const [rows, fields] = await db.query('SELECT * FROM users WHERE id = ?', [jwt_payload.id])
        if (rows[0].id === jwt_payload.id) {
          return done(null, rows[0])
        } else {
          console.log('no err, no user')
          return done(null, false)
        }
      } catch (error) {
        console.log('some err, no user')
        return done(err, false)
      }
    })
  )
}
module.exports = initialize

// const LocalStrategy = require('passport-local').Strategy
// import getDb from './database'

// const initialize = passport => {
//   const db = await getDb()
//   const authenticateUser = async (email, password, done) => {
//     const [rows, fields] = await db.query('SELECT * FROM users WHERE email = ?', [email])
//     if (rows.length === 0) return done(null, false, { message: "Account doesn't exist" })
//     const user = rows[0]
//     try {
//       if (await bcrypt.compare(password, user.password)) {
//         return done(null, user)
//       } else {
//         return done(null, false, { message: ' Password incorrect' })
//       }
//     } catch (error) {
//       return done(error)
//     }
//   }
//   passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
//   passport.serializeUser((user, done) => {})
//   passport.deserializeUser((id, done) => {})
// }
// module.exports = initialize
