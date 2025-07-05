const { PrismaClient } = require("@prisma/client");
const util = require("../utils/passwordUtils");

const prisma = new PrismaClient();

async function createNewUser(username, email, rawPassword) {
  const hashedPassword = await util.encryptPassword(rawPassword);

  await prisma.users.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
}

async function getUserByUsername(username) {
  return await prisma.users.findFirst({
    where: {
      username,
    },
  });
}

async function getUserById(id) {
  return await prisma.users.findUnique({
    where: {
      id,
    },
  });
}

module.exports = { createNewUser, getUserByUsername, getUserById };
