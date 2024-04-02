import { bucket } from "@/config/firebase.config";

export default async function deleteImageByFileName(fileName: string) {
    const file = bucket.file(fileName);
    const isImageExist = await file.exists();
    if (isImageExist[0]) {
        await file.delete();
    }
}