"use server";
import { redirect } from 'next/navigation';
import HomeBox from './HomeBox';
import getMetadataByUsername from '@/actions/database/metadata/getMetadataByUsername';
import getHomeData from '@/actions/database/home/getHomeData';
import addViewer from '@/actions/database/addViewer';



export default async function Page({ params }: { params: { slug: string } }) {

  const response = await getMetadataByUsername(params.slug);
  if (!response) redirect("/not-found");
  const userId = response.id;

  const homeData = await getHomeData(userId);
  if (!homeData) redirect("/not-found");

  await addViewer(userId);

  return <HomeBox homeData={homeData} username={params.slug} />;
}
