//Ready and optimized
import 'server-only';
import { Box, Divider, SimpleGrid, Text } from '@chakra-ui/react';

export default async function Page() {

    const privacyPolicyData = [
        {
            title: "Overview",
            description: "The primary purpose of [Your Portfolio Maker Website] is to enable individuals to showcase themselves publicly through personalized portfolios."
        },
        {
            title: "Information Collected",
            description: "We collect personal information including name, email, photo, education, skills, preferences, and content the user wishes to display publicly."
        },
        {
            title: "Use of Information",
            description: "User data is prominently displayed on the main page of the website via direct profile links, and no login is required for access."
        },
        {
            title: "Data Security",
            description: "All user data is securely stored in our database. Only the respective author has modification access; even the website owner cannot access this information."
        },
        {
            title: "Sharing and Download",
            description: "Users can easily share their profiles on social media platforms (Facebook, messenger, etc.). Additionally, a direct link allows users to download their CV."
        },
        {
            title: "Cookies and Tracking",
            description: "No cookies or tracking mechanisms are utilized. Users can log in directly, and only session storage is required for portfolio access."
        },
        {
            title: "User Control",
            description: "Authors have full control to add, modify, and delete their data at any time. Deleted profiles are saved in a history section for transparency."
        },
        {
            title: "Privacy Policy Updates",
            description: "Users will receive updates on privacy policy changes via the email they are logged in with, ensuring they are informed about any modifications."
        },
        {
            title: "Contact Information",
            description: "For any privacy concerns or inquiries, please refer to our contact page. The website owner's account details can be found in the footer and main page."
        }
    ];


 return (
    <main className='mb-16'>
        <div className="container mx-auto p-5 lg:p-0">
            <Text fontSize='2xl' pb={3}>Privacy Policy</Text>
            <Divider />
            <SimpleGrid columns={[1, 1, 2, 3]} gap={5}>
                {privacyPolicyData.map((data, index) => (
                    <Box key={index} mt={10}>
                        <Text fontSize='xl' fontWeight='semibold'>{index+1}. {data.title}</Text>
                        <Text >{data.description}</Text>
                    </Box>
                ))}
            </SimpleGrid>
        </div>
    </main>
 );
}