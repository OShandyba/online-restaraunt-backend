import connect from '../database/connect.js'
import { getUser } from '../database/users.js'

export default async function authenticateMiddleware(ctx, next) {
    if (ctx.session.userId != null) {
        const db = await connect()

        const user = await getUser(db, ctx.session.userId)

        ctx.user = user
    }

    next()
}