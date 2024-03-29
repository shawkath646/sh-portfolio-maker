"use server";
import { redirect } from "next/navigation";
import { Session } from "next-auth";
import { auth } from "../auth";
import ProfileBox from "./ProfileBox";
import getHomeData from "@/actions/database/home/getHomeData";
import getPortfolioData from "@/actions/database/portfolio/getPortfolioData";
import getProjectItems from "@/actions/database/projects/getProjectItems";
import getGalleryData from "@/actions/database/gallery/getGalleryData";


export default async function Page() {

    const session = await auth() as Session;
    const userId = session.user.id as string;

    const homeData = await getHomeData("pUpfSkG054JiE0FiwhtZ");
    const portfolioData = await getPortfolioData("pUpfSkG054JiE0FiwhtZ");
    const projectItems = await getProjectItems("pUpfSkG054JiE0FiwhtZ");
    const galleryData = await getGalleryData("pUpfSkG054JiE0FiwhtZ");

    if (!homeData || !portfolioData || !projectItems || !galleryData) redirect("/profile/create-user");

    return (
        <ProfileBox
            homeData={homeData}
            portfolioData={portfolioData}
            projectItems={projectItems}
            galleryData={galleryData}
        />
    );
}