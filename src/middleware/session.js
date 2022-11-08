import cookie from 'cookie'
import { randomUUID as generateSID } from 'node:crypto'
import connect from '../database/connect.js'

import { addSession, getSession } from '../database/sessions.js'

const sessionIdCookieName = 'SID'

function createSession() {
    return { id: generateSID() }
}

export default async function sessionMiddleware(ctx, next) {
    if (ctx.session != null) {
        next()
        return
    }
    const db = await connect()
    const sessionId = ctx.request.cookie[sessionIdCookieName]
    const session = sessionId && await getSession(db, sessionId)
    if (session == null) {

        const newSession = createSession()
        await addSession(db, newSession)
        ctx.session = newSession

        const cookieAge = new Date()
        cookieAge.setFullYear(cookieAge.getFullYear() + 1)
        ctx.response.setHeader('Set-Cookie', cookie.serialize(sessionIdCookieName, newSession.id, {
            httpOnly: true,
            expires: cookieAge,
            sameSite: 'Strict',
            path: '/'
        }))
    } else {
        ctx.session = session
    }

    next()
}