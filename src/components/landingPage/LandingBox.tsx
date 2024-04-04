"use client";
import Image from 'next/image';
import { Session } from 'next-auth';
import {
    Box,
    Container,
    Stack,
    Button,
    SimpleGrid,
    Heading,
    Text,
    GridItem,
    Flex,
    Center,
    useMediaQuery,
    ListIcon,
    ListItem,
    List,
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { AppDataType } from 'shas-app-controller/types';
import userSignIn from '@/actions/auth/userSignIn';
import { MetaDataType } from '@/types/types';
import formatDate from "@/utils/formatDate";
import { CiCircleCheck } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";
import { FaArrowRightLong } from 'react-icons/fa6';
import featureImage1 from "@/assets/Feature/Screenshot (129)-portrait.png";
import featureImage2 from "@/assets/Feature/Screenshot (130)-portrait.png";
import featureImage3 from "@/assets/Feature/Screenshot (131)-portrait.png";
import featureImage4 from "@/assets/Feature/Screenshot (132)-portrait.png";
import featureImage5 from "@/assets/Feature/Screenshot (133)-portrait.png";
import featureImage6 from "@/assets/Feature/Screenshot (134)-portrait.png";
import featureImage7 from "@/assets/Feature/Screenshot (135)-portrait.png";



const LandingBox = ({
    appData,
    authorMetadata,
    allUsersMetaData,
    session
}: {
    appData: AppDataType,
    authorMetadata?: MetaDataType,
    allUsersMetaData: MetaDataType[],
    session: Session | null
}) => {
    const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

    return (
        <Box as="main">
            <Box as="section" bgGradient="linear(to-l, #1e3a8a, #4c1d95)" boxShadow="xl">
                <Container
                    as={SimpleGrid}
                    maxW={1536}
                    mx="auto"
                    pt="80px"
                    color="#fff"
                    textAlign={["center", "center", "left"]}
                    minHeight={["100vh", "100vh", "650px"]}
                    columns={[1, 1, 1, 2]}
                    gap={10}
                    position="relative"
                    pb="10px"
                >
                    <GridItem as={Center} color="white">
                        <Box>
                            <Heading size="2xl" bgClip="text" color="white" mb={10}>{appData.appName}</Heading>
                            <Text fontSize="lg" mb={3}>Create your stunning portfolio for free on our ad-free and user-friendly platform.</Text>
                            <Text color='#7dd3fc' fontWeight="semibold" mb={5}>Join over 20 users who have already crafted their professional portfolios with us!</Text>
                            <Text fontWeight='semibold' fontSize="lg" mb={3}>3 Simple Steps to Showcase Your Work:</Text>
                            <List spacing={3} pl={5} mt={3}>
                                <ListItem as={Stack} alignItems="center" direction="row">
                                    <ListIcon as={CiCircleCheck} color="#fbbf24" />
                                    <Text>Login</Text>
                                </ListItem>
                                <ListItem as={Stack} alignItems="center" direction="row">
                                    <ListIcon as={CiCircleCheck} color="#fbbf24" />
                                    <Text>Add Your Portfolio Data</Text>
                                </ListItem>
                                <ListItem as={Stack} alignItems="center" direction="row">
                                    <ListIcon as={CiCircleCheck} color="#fbbf24" />
                                    <Text>Share with the World</Text>
                                </ListItem>
                            </List>
                        </Box>
                    </GridItem>
                    <GridItem as={Center}>
                        <Stack alignItems="center" spacing={5}>
                            <Text fontSize="2xl" fontWeight="semibold" mb={3}>Start your journey -</Text>
                            {session?.user ? (
                                <>
                                    <Link href={`/p/${session.user.name}`} _hover={{ textDecoration: "none" }} w="100%">
                                        <Button colorScheme='linkedin' size="md" width="100%">Visit your portfolio</Button>
                                    </Link>
                                    <Link href="/profile" _hover={{ textDecoration: "none" }} w="100%">
                                        <Button colorScheme='whatsapp' size="md" width="100%">Go to profile</Button>
                                    </Link>
                                </>
                            ) : (
                                <Button
                                    colorScheme='blue'
                                    rightIcon={<FaArrowRightLong size={20} />}
                                    onClick={() => userSignIn()}
                                    size="md"
                                    width="100%"
                                >
                                    Create your now
                                </Button>
                            )}
                            {authorMetadata?.username && (
                                <Link href={`/p/${authorMetadata.username}`} _hover={{ textDecoration: "none" }} w="100%">
                                    <Button colorScheme='purple' size="md" width="100%">Visit developer portfolio</Button>
                                </Link>
                            )}
                        </Stack>
                    </GridItem>
                </Container>
            </Box>

            <Box as="section" w="full" bg="#1e293b">
                <Container as={SimpleGrid} gap={10} columns={[1, 1, 2]} maxW={1536} mx="auto" py={20}>
                    {isLargerThan768 && (
                        <GridItem as={Center} color="#fff">
                            <Box>
                                <Heading as="h1" mb={8}>Animated Introduction Section</Heading>
                                <Text>Present your name, profile, title, and description elegantly with customizable buttons that enable the display of public links and vibrant animated social media icons.</Text>
                            </Box>
                        </GridItem>
                    )}
                    <GridItem as={Center} w="full">
                        <Image
                            src={featureImage1}
                            alt="Featured image 1"
                            height={featureImage1.height}
                            width={featureImage1.width}
                            style={{
                                height: "500px",
                                width: "260px",
                            }}
                        />
                    </GridItem>
                    {!isLargerThan768 && (
                        <GridItem as={Center} color="#fff">
                            <Box>
                                <Heading as="h1" mb={8}>Animated Introduction Section</Heading>
                                <Text>Present your name, profile, title, and description elegantly with customizable buttons that enable the display of public links and vibrant animated social media icons.</Text>
                            </Box>
                        </GridItem>
                    )}
                </Container>
            </Box>
            <Box as="section" w="full" bg="#111827">
                <Container as={SimpleGrid} gap={10} columns={[1, 1, 2]} maxW={1536} mx="auto" py={20}>
                    <GridItem as={Center} w="full">
                        <Image
                            src={featureImage2}
                            alt="Featured image 1"
                            height={featureImage2.height}
                            width={featureImage2.width}
                            style={{
                                height: "500px",
                                width: "260px",
                            }}
                        />
                    </GridItem>
                    <GridItem as={Center} color="#fff">
                        <Box>
                            <Heading as="h1" mb={8}>Organized Skills and Beautiful Featured Cards</Heading>
                            <Text>Curate a selection of your favorite scenes and showcase yourself through a captivating animated photo grid.</Text>
                        </Box>
                    </GridItem>
                </Container>
            </Box>
            <Box as="section" w="full" bg="#1e293b">
                <Container as={SimpleGrid} gap={10} columns={[1, 1, 2]} maxW={1536} mx="auto" py={20}>
                    {isLargerThan768 && (
                        <GridItem as={Center} color="#fff">
                            <Box>
                                <Heading as="h1" mb={8}>Explore Your Pictures</Heading>
                                <Text>Immerse yourself in a visual journey by adding select scenes that reflect your personality and interests. Create a captivating experience with a beautifully animated photo grid, designed to showcase your unique perspective and moments that resonate with you.</Text>
                            </Box>
                        </GridItem>
                    )}
                    <GridItem as={Center} w="full">
                        <Image
                            src={featureImage3}
                            alt="Featured image 3"
                            height={featureImage3.height}
                            width={featureImage3.width}
                            style={{
                                height: "500px",
                                width: "260px",
                            }}
                        />
                    </GridItem>
                    {!isLargerThan768 && (
                        <GridItem as={Center} color="#fff">
                            <Box>
                                <Heading as="h1" mb={8}>Explore Your Pictures</Heading>
                                <Text>Immerse yourself in a visual journey by adding select scenes that reflect your personality and interests. Create a captivating experience with a beautifully animated photo grid, designed to showcase your unique perspective and moments that resonate with you.</Text>
                            </Box>
                        </GridItem>
                    )}
                </Container>
            </Box>
            <Box as="section" w="full" bg="#111827">
                <Container as={SimpleGrid} gap={10} columns={[1, 1, 2]} maxW={1536} mx="auto" py={20}>
                    <GridItem as={Center} w="full">
                        <Image
                            src={featureImage4}
                            alt="Featured image 4"
                            height={featureImage4.height}
                            width={featureImage4.width}
                            style={{
                                height: "500px",
                                width: "260px",
                            }}
                        />
                    </GridItem>
                    <GridItem as={Center} color="#fff">
                        <Box>
                            <Heading as="h1" mb={8}>Your Portfolio, Your Profile, Your Career.</Heading>
                            <Text>Present your life's narrative through curated sections such as education, work experience, volunteering, and rewards & achievements. Showcase your journey to elevate your career trajectory and make a lasting impression on potential collaborators and employers.</Text>
                        </Box>
                    </GridItem>
                </Container>
            </Box>
            <Box as="section" w="full" bg="#1e293b">
                <Container as={SimpleGrid} gap={10} columns={[1, 1, 2]} maxW={1536} mx="auto" py={20}>
                    {isLargerThan768 && (
                        <GridItem as={Center} color="#fff">
                            <Box>
                                <Heading as="h1" mb={8}>Your Project Showcase</Heading>
                                <Text>Whether you're a beginner or advanced, highlight all your projects in your profile to showcase your skills to others. Include source links such as GitHub and live links, complemented by beautiful logos and cover pictures, to captivate your clients. Unlock a detailed Project page with a markdown file, providing additional insights into your projects and enhancing their appeal.</Text>
                            </Box>
                        </GridItem>
                    )}
                    <GridItem as={Center} w="full">
                        <Image
                            src={featureImage5}
                            alt="Featured image 5"
                            height={featureImage5.height}
                            width={featureImage5.width}
                            style={{
                                height: "500px",
                                width: "260px",
                            }}
                        />
                    </GridItem>
                    {!isLargerThan768 && (
                        <GridItem as={Center} color="#fff">
                            <Box>
                                <Heading as="h1" mb={8}>Your Project Showcase</Heading>
                                <Text>Whether you're a beginner or advanced, highlight all your projects in your profile to showcase your skills to others. Include source links such as GitHub and live links, complemented by beautiful logos and cover pictures, to captivate your clients. Unlock a detailed Project page with a markdown file, providing additional insights into your projects and enhancing their appeal.</Text>
                            </Box>
                        </GridItem>
                    )}
                </Container>
            </Box>
            <Box as="section" w="full" bg="#111827">
                <Container as={SimpleGrid} gap={10} columns={[1, 1, 2]} maxW={1536} mx="auto" py={20}>
                    <GridItem as={Center} w="full">
                        <Image
                            src={featureImage6}
                            alt="Featured image 6"
                            height={featureImage6.height}
                            width={featureImage6.width}
                            style={{
                                height: "500px",
                                width: "260px",
                            }}
                        />
                    </GridItem>
                    <GridItem as={Center} color="#fff">
                        <Box>
                            <Heading as="h1" mb={8}>Preserve Your Golden Memories Anywhere.</Heading>
                            <Text>Share your cherished moments with others by uploading your golden photos. Organize them into different categories for easy access and present them beautifully with tap-to-view popups, ensuring your memories shine bright for all to see.</Text>
                        </Box>
                    </GridItem>
                </Container>
            </Box>
            <Box as="section" w="full" bg="#1e293b">
                <Container as={SimpleGrid} gap={10} columns={[1, 1, 2]} maxW={1536} mx="auto" py={20}>
                    {isLargerThan768 && (
                        <GridItem as={Center} color="#fff">
                            <Box>
                                <Heading as="h1" mb={8}>Elevate Your Profile with Additional Information.</Heading>
                                <Text>The Preferences section empowers you to enrich your profile with additional details about yourself. Share information such as your date of birth, marital status, languages spoken, address, and interests. Additionally, document your live events, ensuring that cherished memories are forever etched in time.</Text>
                            </Box>
                        </GridItem>
                    )}
                    <GridItem as={Center} w="full">
                        <Image
                            src={featureImage7}
                            alt="Featured image 7"
                            height={featureImage7.height}
                            width={featureImage7.width}
                            style={{
                                height: "500px",
                                width: "260px",
                            }}
                        />
                    </GridItem>
                    {!isLargerThan768 && (
                        <GridItem as={Center} color="#fff">
                            <Box>
                                <Heading as="h1" mb={8}>Elevate Your Profile with Additional Information.</Heading>
                                <Text>The Preferences section empowers you to enrich your profile with additional details about yourself. Share information such as your date of birth, marital status, languages spoken, address, and interests. Additionally, document your live events, ensuring that cherished memories are forever etched in time.</Text>
                            </Box>
                        </GridItem>
                    )}
                </Container>
            </Box>

            <Box as="section" bgGradient="linear(to-r, gray.800, purple.800)" color="#fff">
                <Container maxW={1536} mx="auto" py={10} minH="500px" fontSize={["xs", "sm", "md"]}>
                    <Flex alignItems="center" justifyContent="center" mb="70px" gap={4}>
                        <Box p={2.5} bg="#d1fae5" borderRadius="full" color="#10b981">
                            <FaUserFriends size={20} />
                        </Box>
                        <Heading size="lg">Latest User Overview</Heading>
                    </Flex>
                    <Flex direction="column" mt={5}>
                        <Flex bg="gray.600" color="white" p={4} borderRadius="md" mb={2} textAlign="center">
                            <Box flex="1">
                                <Text fontWeight="bold">Full name</Text>
                            </Box>
                            <Box flex="1">
                                <Text fontWeight="bold">Joined On</Text>
                            </Box>
                            <Box flex="1">
                                <Text fontWeight="bold">Views</Text>
                            </Box>
                        </Flex>
                        {allUsersMetaData.map((data, index) => (
                            <Flex
                                key={index}
                                bg="gray.700"
                                color="white"
                                p={4}
                                borderRadius="md"
                                mb={2}
                                alignItems="center"
                            >
                                <Box flex="1" pr={2}>
                                    <Link
                                        href={`/p/${data.username}`}
                                        color="#3b82f6"
                                        _hover={{
                                            textDecoration: "none",
                                            color: "#2563eb",
                                            transition: "color 0.3s ease",
                                        }}
                                    >
                                        {data.firstName} {data.lastName}
                                    </Link>
                                </Box>
                                <Box flex="1" textAlign="center">{formatDate(data.joinedOn as Date)}</Box>
                                <Box flex="1" textAlign="center">{data.viewers}</Box>
                            </Flex>
                        ))}
                    </Flex>
                </Container>
            </Box>
        </Box>
    )
};

export default LandingBox;