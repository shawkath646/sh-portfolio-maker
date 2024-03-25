import { db } from "@/config/firebase.config";
import ab from "./ab.json";
import { NextResponse } from "next/server";

export async function GET() {
    const photos = [
        { src: "https://picsum.photos/800/600", width: 800, height: 600 },
        { src: "https://picsum.photos/1600/900", width: 1600, height: 900 },
        { src: "https://picsum.photos/1200/800", width: 1200, height: 800 },
        { src: "https://picsum.photos/1000/700", width: 1000, height: 700 },
        { src: "https://picsum.photos/1400/1000", width: 1400, height: 1000 },
        { src: "https://picsum.photos/900/600", width: 900, height: 600 },
        { src: "https://picsum.photos/1100/750", width: 1100, height: 750 },
        { src: "https://picsum.photos/1300/850", width: 1300, height: 850 }
    ];

    const mainDocRef = db.collection("home").doc("pUpfSkG054JiE0FiwhtZ");

    photos.forEach(async (e) => {
        const docRef = mainDocRef.collection("miniGallery").doc();
        const a = {
            id: docRef.id,
            src: e.src,
            height: e.height,
            width: e.width,
        }
        await docRef.set(a);
    });

    return NextResponse.json({ message: "success" });
}