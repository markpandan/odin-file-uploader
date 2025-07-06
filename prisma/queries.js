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

async function createFile(ownerId, uploadedFile, parentId) {
  const basename = path.parse(uploadedFile.filename).name;
  await prisma.files.create({
    data: {
      id: basename,
      name: uploadedFile.originalname,
      size: uploadedFile.size,
      parentId: parentId || null,
      ownerId,
    },
  });
}

async function createFolder(name, ownerId, parentId) {
  await prisma.folders.create({
    data: {
      name,
      parentId: parentId || null,
      ownerId,
    },
  });
}

async function getFilesById(id, parentId) {
  return await prisma.files.findMany({
    where: {
      ownerId: id,
      parentId: parentId || null,
    },
  });
}

async function getFoldersById(id, parentId) {
  return await prisma.folders.findMany({
    where: {
      ownerId: id,
      parentId: parentId || null,
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

async function getDirectories(id) {
  return await prisma.$queryRaw`WITH RECURSIVE directory AS ( SELECT * FROM "Folders" WHERE id=${id} UNION 
  SELECT f."id", f."name", f."parentId", f."ownerId" FROM "Folders" f INNER JOIN directory d ON d."parentId" = f."id" ) 
  SELECT "id", "name", "parentId" FROM directory`;
}

module.exports = {
  createNewUser,
  createFile,
  createFolder,
  getFilesById,
  getFoldersById,
  getUserByUsername,
  getUserById,
  getDirectories,
};
