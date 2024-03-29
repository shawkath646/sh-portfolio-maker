"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Box, Container, Heading, Tab, Tabs, TabList, TabPanel, TabPanels } from "@chakra-ui/react";
import ProfileIntro from '@/components/profile/intro.profile';
import ProfileFeatured from '@/components/profile/featured.profile';
import ProfileSkills from '@/components/profile/skills.profile';
import ProfileMiniGallery from '@/components/profile/miniGallery.profile';
import ProfileEducation from '@/components/profile/education.profile';
import ProfileWorkExperience from '@/components/profile/workExperience.profile';
import ProfileVolunteering from '@/components/profile/volunteering.profile';
import ProfileReawardAndAchevement from '@/components/profile/reaward&achievement';
import ProfileProjects from '@/components/profile/projects.profile';
import ProfileGallery from '@/components/profile/gallery.profile';
import { GalleryDataType, HomeDataType, PortfolioDataType, ProjectItemType } from '@/types/types';
import navItem from "@/JSONData/navItem.json";



const ProfileBox: React.FC<{
    homeData: HomeDataType,
    portfolioData: PortfolioDataType,
    projectItems: ProjectItemType[],
    galleryData: GalleryDataType,
}> = ({
    homeData,
    portfolioData,
    projectItems,
    galleryData
}) => {

        const router = useRouter();
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
                        <TabList
                            overflowX="scroll"
                            sx={{
                                '::-webkit-scrollbar': {
                                    display: 'none'
                                }
                            }}
                        >
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
                                <ProfileWorkExperience workExperienceItems={portfolioData.workExperience} />
                                <ProfileVolunteering volunteeringItems={portfolioData.volunteering} />
                                <ProfileReawardAndAchevement reawardAndAchievementItems={portfolioData.reawards} />
                            </TabPanel>
                            <TabPanel>
                                <ProfileProjects projectItems={projectItems} />
                            </TabPanel>
                            <TabPanel>
                                <ProfileGallery galleryData={galleryData} />
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