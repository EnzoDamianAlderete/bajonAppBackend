import dotenv from "dotenv";

dotenv.config();

export default {
  SERVER_PORT: process.env.SERVER_PORT || 3100,
  DB_URL:process.env.DB_URL,
  SECRET_WORD: process.env.SECRET_WORD,
}