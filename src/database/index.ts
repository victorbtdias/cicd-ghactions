require("dotenv").config();
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(String(process.env.DATABASE_URL), {
  define: {
    underscored: true,
  },
});
