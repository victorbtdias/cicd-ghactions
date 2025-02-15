("use strict");

require("dotenv").config();
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash(process.env.USER_PASSWORD, 10);

    await queryInterface.bulkInsert("users", [
      {
        nome: "Victor",
        email: "victor@email.com",
        password: hashedPassword,
        role: "ADMIN",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {
      where: { email: "victor@email.com" },
    });
  },
};
