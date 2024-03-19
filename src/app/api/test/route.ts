import { db } from "@/config/firebase.config";
import ab from "./ab.json";
import { NextResponse } from "next/server";

export async function GET() {
    const mainDocRef = db.collection("gallery").doc("pUpfSkG054JiE0FiwhtZ");

    ab.forEach(async (e) => {
        const docRef = mainDocRef.collection("galleryItems").doc();
        const a = {
            id: docRef.id,
            src: e.src,
            height: e.height,
            width: e.width,
            collectionId: e.collectionId
        }
        await docRef.set(a);
    });

    return NextResponse.json({ message: "success" });
}