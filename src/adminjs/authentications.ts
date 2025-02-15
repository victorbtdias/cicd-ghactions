require("dotenv").config();
import { AuthenticationOptions } from "@adminjs/express";
import bcrypt from "bcrypt";
import { User } from "../models/User";

export const authenticationOptions: AuthenticationOptions = {
  authenticate: async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (user) {
      const matched = await bcrypt.compare(password, user.password);

      if (matched) {
        return user;
      }
    }
    return false;
  },
  cookiePassword: String(process.env.ADMINJS_COOKIE_PASSWORD),
};
