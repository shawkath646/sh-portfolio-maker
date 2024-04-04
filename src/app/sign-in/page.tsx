"use server";
import type { Metadata } from 'next';
import { redirect } from "next/navigation";
import SHAS from "shas-app-controller";
import SignInBox from "./SignInBox";

export async function metadata(): Promise<Metadata> {
    return {
        title: "Sign in - SH Portfolio Maker",
        openGraph: {
            images: `${process.env.NEXT_PUBLIC_BASE_URL}/sign-in/opengraph-image.png`,
        },
    }
};


export default async function Page() {

    const { brandData } = await SHAS();
    if (!brandData) redirect("/not-found");
    return <SignInBox
        brandName={brandData?.name}
        brandIconTransparent={brandData?.iconTransparent}
        brandWebsite={brandData?.website}
    />
}