"use server";
import { auth } from "@/app/auth";
import { db } from "@/config/firebase.config";
import { PartialBy, ResponseType, ViewerItemType } from "@/types/types";

const addViewer = async (userId: string): Promise<ResponseType> => {
    const session = await auth();
    if (!session?.user.id) return {
        status: "success",
        message: "Profile view can't be count without login"
    };

    const now = new Date;
    const viewerRef = db.collection("metadata").doc(userId).collection("viewers").doc(session.user.id);
    const viewerOld = await viewerRef.get();

    const viewerObject: PartialBy<PartialBy<ViewerItemType, "name">, "username"> = {
        firstViewedOn: now,
        lastViewedOn: now,
        id: session.user.id
    }

    if (viewerOld.exists) {
        const oldViewerData = viewerOld.data() as ViewerItemType;
        viewerObject.firstViewedOn = oldViewerData.firstViewedOn;
    }

    await viewerRef.set(viewerObject);

    return {
        status: "success",
        message: 'Viewer item added successfully.'
    };
};

export default addViewer;