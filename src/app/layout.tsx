import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import { auth } from "./auth";
import { Analytics } from "@vercel/analytics/react"
import SHAS from "shas-app-controller";
import ClientWrapper from '@/components/layout/ClientWrapper';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import getMetadataById from "@/actions/database/metadata/getMetadataById";
import { AppDataType } from "shas-app-controller/types";

const inter = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: {
    default: "SH Portfolio Maker",
    template: "%s | SH Portfolio Maker"
  },
  authors: {
    name: "Shawkat Hossain Maruf",
    url: "https://sh-portfolio-maker.vercel.app/p/shawkath646"
  },
  category: "Web application",
  creator: "Shawkat Hossain Maruf",
  description: "SH Portfolio Maker offers a comprehensive, complimentary platform designed to craft elegant, structured, and animated portfolios tailored to showcase your professional profile. Sign in effortlessly and begin presenting your work with sophistication and ease.",
  keywords: ["NextJS 14", "Full stack", "Web applicaiton", "Chakra UI", "UI/UX Design", "Portfolio maker", "animated", "showcase", "SH Portfolio Maker", "CloudBurst Lab", "Shawkat Hossain Maruf", "shawkath646", "SH Maruf"],
  publisher: "CloudBurst Lab",
  openGraph: {
    images: `${process.env.NEXT_PUBLIC_BASE_URL}/opengraph-image.png`,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
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
            <Navbar session={session} appData={appData as AppDataType} />
            {children}
            <Footer appData={appData} brandData={brandData} authorData={authorData} />
          </ContentWrapper>
          <Analytics />
        </ClientWrapper>
      </body>
    </html>
  );
}