import dotenv from 'dotenv';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
;
export default {
  port: parseInt(process.env.PORT, 10),
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  api: {
    prefix: '/api',
  },
  databases: [
    {
      existence: process.env.MARIA_HOST ? true : false,
      config: {
        username: process.env.MARIA_USER,
        password: process.env.MARIA_PW,
        database: process.env.MARIA_NAME,
        host: process.env.MARIA_HOST,
        port: process.env.MARIA_PORT,
        dialect: 'mariadb',
      },
    },
    {
      existence: process.env.PG_HOST ? true : false,
      config: {
        username: process.env.PG_USER,
        password: process.env.PG_PW,
        database: process.env.PG_NAME,
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        dialect: 'postgres',
      },
    },
    {
      existence: process.env.MYSQL_HOST ? true : false,
      config: {
        username: 'root',
        password: 'password',
        database: 'database2',
        host: '127.0.0.1',
        dialect: 'mysql',
      },
    },
    {
      existence: process.env.SQLITE_HOST ? true : false,
      config: {
        username: 'root',
        password: 'password',
        database: 'database2',
        host: '127.0.0.1',
        dialect: 'sqlite',
      },
    },
    {
      existence: process.env.MSSQL ? true : false,
      config: {
        username: 'root',
        password: 'password',
        database: 'database2',
        host: '127.0.0.1',
        dialect: 'mssql',
      },
    },
    {
      existence: process.env.ORACLE ? true : false,
      config: {
        username: 'root',
        password: 'password',
        database: 'database2',
        host: '127.0.0.1',
        dialect: 'oracle',
      },
    },
  ],
  nodeMode: process.env.NODE_ENV || 'development',
};
