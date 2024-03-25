"use server";
import { redirect } from "next/navigation";
import SHAS from "shas-app-controller";
import SignInBox from "./SignInBox";


export default async function Page() {

    const { brandData } = await SHAS();
    if (!brandData) redirect("/not-found");
    return <SignInBox
        brandName={brandData?.name}
        brandIconTransparent={brandData?.iconTransparent}
        brandWebsite={brandData?.website}
    />
}