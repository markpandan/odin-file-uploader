const { PrismaClient } = require("@prisma/client");
const util = require("../utils/passwordUtils");
const path = require("node:path");
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

async function createFile(ownerId, uploadedFile) {
  const basename = path.parse(uploadedFile.filename).name;
  await prisma.files.create({
    data: {
      id: basename,
      name: uploadedFile.originalname,
      size: uploadedFile.size,
      ownerId,
    },
  });
}

async function createFolder(name, ownerId, parentFolder) {
  await prisma.folders.create({
    data: {
      name,
      ownerId,
      parentId: parentFolder || null,
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

module.exports = {
  createNewUser,
  createFile,
  createFolder,
  getUserByUsername,
  getUserById,
};
