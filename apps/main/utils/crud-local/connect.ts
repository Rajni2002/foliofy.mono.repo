import { CachedLinkPreviewType } from "@/types/ui/link-preview";
import fs, { mkdir, readFileSync } from "fs";
import path from "path";

const previewFilePath = path.join(process.cwd(), "data", "preview.json");

const canAccess = async (path: string) => {
  try {
    await fs.promises.access(path, fs.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
};

export async function readSavedData() {
  try {
    const isExist = await canAccess(previewFilePath);
    if (!isExist) return {};
    const jsonFile = await fs.promises.readFile(previewFilePath, {
      encoding: "utf-8",
    });
    return JSON.parse(jsonFile);
  } catch (error) {
    console.log(error);
    throw new Error("Something Went Wrong");
  }
}

export async function saveData(data: CachedLinkPreviewType) {
  try {
    const isExist = await canAccess(previewFilePath);
    if (!isExist) {
      await fs.promises.mkdir(path.dirname(previewFilePath), {
        recursive: true,
      }); // Create directory if it doesn't exist
    }
    await fs.promises.writeFile(previewFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.log(error);
    throw new Error("Something Went Wrong");
  }
}
