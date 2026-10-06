import { expressjwt } from 'express-jwt'

// TODO: temporarily disabled — set to false to turn authentication back on
const AUTH_DISABLED = true
// every request is treated as coming from this fake user while auth is off
const DEV_USER_ID = '000000000000000000000001'

const jwtAuth = expressjwt({
  secret: () => process.env.JWT_SECRET,
  algorithms: ['HS256'],
})

export const requireAuth = AUTH_DISABLED
  ? (req, res, next) => {
      req.auth = { sub: DEV_USER_ID }
      next()
    }
  : jwtAuth
