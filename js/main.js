import { handleUploadedFile } from "./services/handleUploadedFile.js";

document.getElementById('uploadFile').addEventListener("change", handleUploadedFile)