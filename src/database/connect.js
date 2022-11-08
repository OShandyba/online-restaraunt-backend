import pg from 'pg'
import once from '../helpers/functions.js'
const { Client } = pg

export async function connect() {
    const client = new Client()
    await client.connect()
    return client
}

export default once(connect)