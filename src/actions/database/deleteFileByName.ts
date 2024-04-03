import { bucket } from "@/config/firebase.config";

export default async function deleteFileByName(fileName: string) {
    const file = bucket.file(fileName);
    const isFileExist = await file.exists();
    if (isFileExist[0]) {
        await file.delete();
    }
}