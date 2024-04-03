"use server";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import uploadFile from "@/actions/database/uploadFile";
import { ProjectItemType, ResponseType } from "@/types/types";


const AddProjectItem = async(item: ProjectItemType): Promise<ResponseType> => {
    const session = await auth();
    if (!session?.user.id) return {
        status: "error",
        message: 'Something went wrong with user session.'
    };

    if (item.icon) {
        const { downloadURL } = await uploadFile(item.icon, `projectItem-icon-${item.id}`);
        item.icon = downloadURL;
    };

    if (item.coverImage) {
        const { downloadURL } = await uploadFile(item.coverImage, `projectItem-coverImage-${item.id}`);
        item.coverImage = downloadURL;
    };

    if (item.description) {
        const { downloadURL } = await uploadFile(item.description, `projectItem-description-${item.id}`);
        item.description = downloadURL;
    };

    await db.collection("projects").doc(session.user.id).collection("projectItems").doc(item.id).set(item);

    return {
        status: "success",
        message: 'Project item updated successfully.'
    };
};

export default AddProjectItem;