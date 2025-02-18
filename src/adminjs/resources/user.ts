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
  editProperties: ["nome", "email", "password", "role"],
  filterProperties: ["nome", "email", "role"],
  listProperties: ["id", "nome", "email", "role"],
  showProperties: ["id", "nome", "email", "role", "createdAt", "updatedAt"],
};
