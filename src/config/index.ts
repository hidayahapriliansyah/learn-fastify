import dotenv from 'dotenv';

dotenv.config();

export default {
  accessCookieName: process.env.ACCESS_COOKIE_NAME as string,
};
