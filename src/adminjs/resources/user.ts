import { ResourceOptions } from "adminjs";

export const userResourceOptions: ResourceOptions = {
  navigation: "Usuários",
  properties: {
    password: {
      type: "password",
    },
    role: {
      availableValues: [
        { value: "ADMIN", label: "Administrador" },
        { value: "USER", label: "Usuário Padrão" },
      ],
    },
  },
  editProperties: ["name", "email", "password", "role"],
  filterProperties: ["name", "email", "role"],
  listProperties: ["id", "name", "email", "role"],
  showProperties: ["id", "name", "email", "role", "createdAt", "updatedAt"],
};
