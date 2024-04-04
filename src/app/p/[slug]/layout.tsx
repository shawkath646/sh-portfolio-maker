"use server";
import type { Metadata } from 'next';
import getMetadataByUsername from '@/actions/database/metadata/getMetadataByUsername';
import getHomeData from '@/actions/database/home/getHomeData';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const response = await getMetadataByUsername(params.slug);
    let description, keywords, ogImage;
    if (response) {
        const homeData = await getHomeData(response?.id);
        description = homeData?.intro.description;

        keywords = ["SH Portfolio Maker", "CloudBurst Lab", response.firstName, response.lastName, response.username];
        homeData?.intro.title && keywords.concat(homeData?.intro.title);
        
        ogImage = `${process.env.NEXT_PUBLIC_BASE_URL}/api/ogImage?username=${response.username}&fullName=${homeData?.intro.fullName}&introPic=${homeData?.intro.introPic}`;
    }
    return {
        title: `@${response?.username} - SH Portfolio Maker`,
        description,
        keywords,
        openGraph: {
            images: ogImage
        }
    }
};

export default async function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            {children}
        </>
    );
}