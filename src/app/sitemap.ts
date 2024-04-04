import { MetadataRoute } from 'next';
import getAllMetadata from '@/actions/database/metadata/getAllMetadata';

interface SitemapEntry {
    url: string;
    lastModified?: Date;
    changeFrequency: 'weekly' | 'always' | 'hourly' | 'daily' | 'monthly' | 'yearly' | 'never';
    priority: number;
}

function getUserSitemapEntries(allUser: any[], urlSuffix: string): SitemapEntry[] {
    return allUser.map((item) => ({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/p/${item.username}${urlSuffix}`,
        lastModified: item.joinedOn as Date,
        changeFrequency: 'weekly',
        priority: 0.8,
    }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const allUser = await getAllMetadata();
    
    const userSitemapEntries: SitemapEntry[] = [
        getUserSitemapEntries(allUser, ''),
        getUserSitemapEntries(allUser, '/portfolio'),
        getUserSitemapEntries(allUser, '/projects'),
        getUserSitemapEntries(allUser, '/gallery'),
        getUserSitemapEntries(allUser, '/preferences'),
    ].flat();
    
    const additionalEntries: MetadataRoute.Sitemap = [
        {
            url: process.env.NEXT_PUBLIC_BASE_URL as string,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile/portfolio`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile/projects`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile/gallery`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile/preferences`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile/sign-in`,
            lastModified: new Date(),
            changeFrequency: 'never',
            priority: 0.8,
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile/create-new`,
            lastModified: new Date(),
            changeFrequency: 'never',
            priority: 0.8,
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
    ];

    return [...userSitemapEntries, ...additionalEntries];
}
