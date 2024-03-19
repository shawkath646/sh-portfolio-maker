"use server";
import { db } from "@/config/firebase.config";
import { QuickLinksType, ResponseType } from "@/types/types";


export async function updateQuickLinksItem(userId: string, quickLinksData: QuickLinksType[]): Promise<ResponseType> {
    if (quickLinksData.length >= 5) {
        return {
            status: "error",
            message: 'Maximum 5 quick links allowed'
        };
    }

    const quickLinksRef = db.collection('intro').doc(userId).collection('quickLinks');
    const batch = db.batch();

    const oldQuickLinksSnapshot = await quickLinksRef.get();
    oldQuickLinksSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
    });

    quickLinksData.forEach((quickLink) => {
        const newQuickLinkRef = quickLinksRef.doc();
        batch.set(newQuickLinkRef, quickLink);
    });

    await batch.commit();

    return {
        status: "success",
        message: 'Quick links updated successfully'
    };
}