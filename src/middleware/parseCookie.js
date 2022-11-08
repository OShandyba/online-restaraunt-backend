import cookie from 'cookie'

export default function parseCookie(ctx, next) {
    const rawCookie = ctx.request.headers.cookie
    ctx.request.cookie = {}

    if (rawCookie) {
        Object.assign(ctx.request.cookie, cookie.parse(rawCookie))
    }

    next()
}