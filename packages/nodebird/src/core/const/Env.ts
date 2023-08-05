export namespace Env {
  export const port = process.env.PORT ?? 3000

  export const cookieSecret = process.env.COOKIE_SECRET!

  export const datasource = {
    host: process.env.DB_HOST!,
    port: +process.env.DB_PORT!,
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_SCHEMA!
  }

  export const kakao = {
    clientId: process.env.KAKAO_CLIENT_ID!
  }
}
