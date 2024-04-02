import { bucket } from "@/config/firebase.config";
import { ResponseType } from "@/types/types";
import deleteImageByFileName from "./deleteImageByFileName";
import MessagesList from "@/JSONData/MessagesList.json"

interface ResponseExtendedType extends ResponseType {
    downloadURL: string;
}

export default async function uploadImage(base64: string, fileName: string): Promise<ResponseExtendedType> {

    const base64Pattern = /^data:image\/(png|jpeg|jpg|gif);base64,(.+)$/;

    if (base64Pattern.test(base64)) {
        await deleteImageByFileName(fileName);

        const imageType = base64.split(';')[0].split(':')[1];
        const pureBase64 = base64.replace(/^data:image\/\w+;base64,/, '');

        const buffer = Buffer.from(pureBase64, 'base64');

        const imageSizeInBytes = buffer.length;
        const maxSizeInBytes = 3 * 1024 * 1024;

        if (imageSizeInBytes >= maxSizeInBytes) return {
            status: "error",
            message: MessagesList.M006.message,
            downloadURL: ""
        }

        const file = bucket.file(fileName);

        const expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 100);

        await file.save(buffer, {
            contentType: imageType,
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
    }
    
    return {
        status: "success",
        message: "",
        downloadURL: base64
    };

}