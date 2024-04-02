import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import { auth } from "./auth";
import SHAS from "shas-app-controller";
import ClientWrapper from '@/components/layout/ClientWrapper';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import getMetadataById from "@/actions/database/metadata/getMetadataById";
import './globals.css';

const inter = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: 'SH Portfolio Maker',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  const { ContentWrapper, appData, brandData } = await SHAS({ imageOptimization: true });
  const session = await auth();
  const authorId = process.env.AUTHOR_ID as string;
  const authorData = await getMetadataById(authorId);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientWrapper>
          <ContentWrapper>
            <Navbar session={session} appData={appData} />
            {children}
            <Footer appData={appData} brandData={brandData} authorData={authorData} />
          </ContentWrapper>
        </ClientWrapper>
      </body>
    </html>
  );
}