export const databaseConfig = {
    host: process.env.DB_HOST ?? '',
    port: parseInt(process.env.DB_PORT ?? "3306"),
    user: 'root',
    password: process.env.DB_PASSWORD ?? '',
    database: 'telehunter',
}