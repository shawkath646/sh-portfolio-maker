import { bucket } from "@/config/firebase.config";
import { ResponseType } from "@/types/types";
import deleteFileByName from "./deleteFileByName";

interface ResponseExtendedType extends ResponseType {
    downloadURL: string;
}

export default async function uploadFile(base64: string, fileName: string): Promise<ResponseExtendedType> {

    const base64ImagePattern = /^data:image\/(png|jpeg|jpg|gif);base64,(.+)$/;
    const base64FilePattern = /^data:application\/octet-stream;base64,/i;

    let pureBase64;

    if (base64FilePattern.test(base64)) pureBase64 = base64.replace(/^data:application\/octet-stream;base64,/, '');
    else if (base64ImagePattern.test(base64)) pureBase64 = base64.replace(/^data:image\/\w+;base64,/, '');
    else return {
        status: "success",
        message: "",
        downloadURL: base64
    };

    await deleteFileByName(fileName);

    const fileType = base64.split(';')[0].split(':')[1];
    const buffer = Buffer.from(pureBase64, 'base64');

    const fileSizeInBytes = buffer.length;
    const maxSizeInBytes = 3 * 1024 * 1024;

    if (fileSizeInBytes >= maxSizeInBytes) return {
        status: "error",
        message: "File size can't be greater than 3MB",
        downloadURL: ""
    }

    const file = bucket.file(fileName);

    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 100);

    await file.save(buffer, {
        contentType: fileType,
        public: true
    });

    const downloadURL = await file.getSignedUrl({
        action: 'read',
        expires: expirationDate,
    });

    return {
        status: "registred",
        message: "",
        downloadURL: downloadURL[0]
    };
};