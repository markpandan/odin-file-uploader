const { PrismaClient } = require("@prisma/client");
const { recursiveDirectory } = require("@prisma/client/sql");
const util = require("../utils/passwordUtils");
const path = require("node:path");

const prisma = new PrismaClient();

exports.createNewUser = async (username, email, rawPassword) => {
  const hashedPassword = await util.encryptPassword(rawPassword);

  await prisma.users.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
};

exports.createFile = async (ownerId, uploadedFile, parentId) => {
  const basename = path.parse(uploadedFile.filename).name;
  await prisma.files.create({
    data: {
      id: basename,
      name: uploadedFile.originalname,
      size: uploadedFile.size,
      parentId: parentId || null,
      ownerId,
      directory: uploadedFile.path,
    },
  });
};

exports.createFolder = async (name, ownerId, parentId) => {
  await prisma.folders.create({
    data: {
      name,
      parentId: parentId || null,
      ownerId,
    },
  });
};

exports.getOneFileById = async (id) => {
  return await prisma.files.findUnique({
    where: {
      id,
    },
  });
};

exports.getFilesById = async (id, parentId) => {
  return await prisma.files.findMany({
    where: {
      ownerId: id,
      parentId: parentId || null,
    },
  });
};

exports.getFoldersById = async (id, parentId) => {
  return await prisma.folders.findMany({
    where: {
      ownerId: id,
      parentId: parentId || null,
    },
  });
};

exports.getUserByUsername = async (username) => {
  return await prisma.users.findFirst({
    where: {
      username,
    },
  });
};

exports.getUserById = async (id) => {
  return await prisma.users.findUnique({
    where: {
      id,
    },
  });
};

exports.getDirectories = async (id) => {
  return await prisma.$queryRawTyped(recursiveDirectory(id));
};

exports.updateFileById = async (id, newName) => {
  const updateUser = await prisma.files.update({
    where: {
      id,
    },
    data: {
      name: newName,
    },
  });
  console.log(updateUser);
};
