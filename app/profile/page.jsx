import 'server-only';
import { Container, Tabs, TabList, TabPanels, Tab, TabPanel, Heading } from '@chakra-ui/react'
import AdminHome from '@/components/profile/AdminHome';


export default function Page() {

    return (
        <Container as="main" maxW={'8xl'} padding={1}>
            <Heading textAlign="center">Admin Panel</Heading>
            <Tabs marginY={10}>
                <TabList>
                    <Tab>Main</Tab>
                    <Tab>Mini Gallery</Tab>
                    <Tab>Skills</Tab>
                    <Tab>Projects</Tab>
                    <Tab>Contacts</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <AdminHome />
                    </TabPanel>
                    <TabPanel>
                    <p>two!</p>
                    </TabPanel>
                    <TabPanel>
                    <p>three!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    );
}