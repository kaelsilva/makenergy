const jwt = require('jsonwebtoken')
const tokenSecret = process.env.TOKENSECRET

class Middleware {
    verify = (req: any, res: any, next: any) => {
        const token = req.headers.authorization
        if (!token) res.status(403).json({error: "Please provide a token."})
        else {
            jwt.verify(token.split(" ")[1], tokenSecret, (err: any, value: any) => {
                if (err) res.status(500).json({error: 'Failed to authenticate token.'})
                req.user = value.data
                next()
            })
        }
    }
}
export default Middleware;