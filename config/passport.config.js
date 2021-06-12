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
      try {
        const [rows, fields] = await db.query('SELECT * FROM users WHERE id = ?', [jwt_payload.id])
        if (rows[0].id === jwt_payload.id) {
          return done(null, rows[0])
        } else {
          return done(null, false)
        }
      } catch (error) {
        return done(error, false)
      }
    })
  )
}
module.exports = initialize
