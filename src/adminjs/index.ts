require("dotenv").config();
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import { sequelize } from "../database";
import { adminJsResources } from "./resources";
import { locale } from "./locale";
import { dashboardOptions } from "./dashboard";
import { authenticationOptions } from "./authentications";
import session from "express-session";
import connectSession from "connect-session-sequelize";
import { brandingOptions } from "./branding";

const SequelizeStore = connectSession(session.Store);
const store = new SequelizeStore({ db: sequelize });
store.sync();

AdminJS.registerAdapter(AdminJSSequelize);

export const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: "/admin",
  resources: adminJsResources,
  branding: brandingOptions,
  locale: locale,
  dashboard: dashboardOptions,
});

export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  authenticationOptions,
  null,
  {
    resave: false,
    saveUninitialized: false,
    store: store,
    secret: String(process.env.ADMINJS_COOKIE_PASSWORD),
  }
);
