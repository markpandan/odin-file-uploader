const newFolderButton = document.querySelector("#new-folder-button");
const uploadFileButton = document.querySelector("#upload-file-button");

const newFolderDialog = document.querySelector("#new-folder-dialog");
const uploadFileDialog = document.querySelector("#upload-file-dialog");
const fileInfoDialog = document.querySelector("#file-info-dialog");
const renameFileDialog = document.querySelector("#rename-file-dialog");

const newFolderCloseButton = document.querySelector("#new-folder-close-button");
const uploadFileCloseButton = document.querySelector(
  "#upload-file-close-button"
);
const renameFileCloseButton = document.querySelector(
  "#rename-file-close-button"
);
const fileInfoCloseButton = document.querySelector("#file-info-close-button");

newFolderButton.addEventListener("click", () => {
  newFolderDialog.showModal();
});

uploadFileButton.addEventListener("click", () => {
  uploadFileDialog.showModal();
});

newFolderCloseButton.addEventListener("click", (e) => {
  e.preventDefault();
  newFolderDialog.close();
});

uploadFileCloseButton.addEventListener("click", (e) => {
  e.preventDefault();
  uploadFileDialog.close();
});

fileInfoCloseButton.addEventListener("click", (e) => {
  e.preventDefault();
  fileInfoDialog.close();
});

renameFileCloseButton.addEventListener("click", (e) => {
  e.preventDefault();
  renameFileDialog.close();
});

// file argument is based on Files database schema
