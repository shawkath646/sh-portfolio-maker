"use server";
import { redirect } from 'next/navigation';
import { auth } from './auth';
import SHAS from 'shas-app-controller';
import LandingBox from '@/components/landingPage/LandingBox';
import getAllMetadata from '@/actions/database/metadata/getAllMetadata';


export default async function Home() {

  const authorId = process.env.AUTHOR_ID as string;
  const allUsersMetaData = await getAllMetadata();

  if (!allUsersMetaData) redirect("/not-found");

  const session = await auth();
  const { appData } = await SHAS();

  if (!appData) redirect("/not-found");

  const authorMetaData = allUsersMetaData.find(item => item.id === authorId);

  return <LandingBox
    appData={appData}
    allUsersMetaData={allUsersMetaData}
    authorMetadata={authorMetaData}
    session={session}
  />
}
