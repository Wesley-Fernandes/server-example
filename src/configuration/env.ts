import 'dotenv/config';

if (!process.env.PORT) {
  throw new Error('Missing PORT env!');
} else if (!process.env.DATABASE_URL) {
  throw new Error('Missing DATABASE URL env!');
} else if (!process.env.JWT_SECRET_CODE) {
  throw new Error('Missing JWT SECRET CODE env!');
}

const env = {
  database_url: process.env.DATABASE_URL,
  port: process.env.PORT,
  JWT: process.env.JWT_SECRET_CODE,
};

export default env;
