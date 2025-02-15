import { ResourceWithOptions } from "adminjs";

import { User } from "../../models/User";
import { userResourceOptions } from "./user";

export const adminJsResources: ResourceWithOptions[] = [
  {
    resource: User,
    options: userResourceOptions,
  },
];
