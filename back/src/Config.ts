export namespace DatabaseDefaults {

  export const host = '####'
  export const user = '####'
  export const password = '####'
  export const database = '####'

  export const schema = '####'
  export const port = '####'
  export const pool_min = '####'
  export const pool_max = '####'
  export const pool_idle = '####'
}
export namespace Telegram {
  export const token = process.env.BOTTOKEN || 'telegram-token-is-not-provided'
}

export namespace Server {
  export const port = Number(process.env.PORT || '4000')
  export const isDev = process.env.NODE_ENV === 'development'
}

export namespace Database {
  export const host = process.env.DATABASE_HOSTNAME || DatabaseDefaults.host
  export const database = process.env.DATABASE_DBNAME || DatabaseDefaults.database
  export const user = process.env.DATABASE_USERNAME || DatabaseDefaults.user
  export const password = process.env.DATABASE_PASSWORD || DatabaseDefaults.password
  export const schema = process.env.DATABASE_SCHEMA || DatabaseDefaults.schema
  export const port = Number(process.env.DATABASE_PORT || DatabaseDefaults.port)

  export const poolMin = Number(process.env.DATABASE_POOL_MIN || DatabaseDefaults.pool_min)
  export const poolMax = Number(process.env.DATABASE_POOL_MAX || DatabaseDefaults.pool_max)
  export const poolIdle = Number(process.env.DATABASE_POOL_IDLE || DatabaseDefaults.pool_idle)
}

// export namespace Redis {
//   export const url = process.env.REDIS_URL || 'redis'
// }

export default { Database, Server, Telegram/*, Redis*/ }
