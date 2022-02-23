export default () => ({
  database: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASS,
    db: process.env.DATABASE_DB,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  environment: process.env.ENVIRONMENT,
});
