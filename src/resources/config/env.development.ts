export default {
    environment: 'development' || process.env.NODE_ENV,
    baseUrl: '/api/v1',
    session: process.env.SESSION || 'secret-boilerplate-token',
    token: process.env.TOKEN || 'secret-jwt-token',
    database: {
        name: process.env.DB_NAME || 'postgres',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'pankaj',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '3306',
        dialect: process.env.DB_DIALECT || 'postgres'
    }
}
