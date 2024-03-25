"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Box, Container, Heading, Tab, Tabs, TabList, TabPanel, TabPanels } from "@chakra-ui/react";
import ProfileIntro from '@/components/profileHome/ProfileIntro';
import ProfileFeatured from '@/components/profileHome/ProfileFeatured';
import ProfileSkills from '@/components/profileHome/ProfileSkills';
import ProfileMiniGallery from '@/components/profileHome/ProfileMiniGallery';
import ProfileEducation from '@/components/profilePortfolio/ProfileEducation';
import { HomeDataType, PortfolioDataType } from '@/types/types';
import navItem from "@/JSONData/navItem.json";


const ProfileBox = ({ homeData, portfolioData }: { homeData: HomeDataType, portfolioData: PortfolioDataType }) => {

    const router  = useRouter();
    const searchParams = useSearchParams();
    const queryTab = searchParams.get("tab") || "home";
    
    const [currentTab, setCurrentTab] = useState(navItem.findIndex(item => item.name.toLowerCase() === queryTab.toLowerCase()));

    const handleTabChange = (tabIndex: number) => {
        const tabName = navItem[tabIndex].name.toLowerCase();
        router.push(`/profile?tab=${tabName}`);
        setCurrentTab(tabIndex);
    };

    return (
        <Box as="main" h="full" w="full">
            <Container maxW={1536} mx="auto" pt={20} px={0} overflow="hidden" minH="75vh">
                <Tabs index={currentTab} onChange={handleTabChange}>
                    <TabList>
                        {navItem.map((item, index) => (
                            <Tab key={index}>{item.name}</Tab>
                        ))}
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <ProfileIntro introData={homeData.intro} />
                            <ProfileFeatured featuredItems={homeData.featuredItems} />
                            <ProfileSkills skillItems={homeData.skillItems} skillsCategories={homeData.intro.skillsCategories} />
                            <ProfileMiniGallery miniGalleryItems={homeData.miniGalleryItems} />
                        </TabPanel>
                        <TabPanel>
                            <ProfileEducation educationItems={portfolioData.education} />
                        </TabPanel>
                        <TabPanel>
                            <Heading>Projects</Heading>
                        </TabPanel>
                        <TabPanel>
                            <Heading>Gallery</Heading>
                        </TabPanel>
                        <TabPanel>
                            <Heading>Preferences</Heading>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Container>
        </Box>
    );
};

export default ProfileBox;