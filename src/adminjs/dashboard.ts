import AdminJS, { PageHandler } from "adminjs";
import { User } from "../models/User";

export const dashboardOptions: {
  handler?: PageHandler;
  component?: string;
} = {
  component: AdminJS.bundle("./components/Dashboard"),
  handler: async (req, res, context) => {
    const users = await User.count();

    res.json({
      Usuários: users,
    });
  },
};
