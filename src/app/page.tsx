"use server";
import Image from 'next/image';
import { auth } from './auth';
import SHAS from 'shas-app-controller';
import { Box, Container, Stack, Button, SimpleGrid, Heading, Text, GridItem, Table, Td, Tr, TableContainer, Thead, Th, Tbody, Divider, } from '@/lib/ChakraUIReactClient';
import { Link } from '@/lib/ChakraUINextJsClient';
import SignInButton from '@/components/landingPage/SignInButton';
import FeaturesList from '@/components/landingPage/FeaturesList';
import getAllMetadata from '@/actions/database/metadata/getAllMetadata';
import getMetadataById from '@/actions/database/metadata/getMetadataById';
import formatDate from "@/utils/formatDate";
import bannerImage from "@/assets/pexels-veeterzy-303383.jpg";



export default async function Home() {

  const authorId = process.env.AUTHOR_ID as string;
  const authorMetaData = await getMetadataById(authorId);
  const allUsersMetaData = await getAllMetadata();

  const session = await auth();
  const { appData } = await SHAS();


  return (
    <Box as="main" position="relative">
      <Box position="relative">
        <Image src={bannerImage.src} fill alt="Banner cover" style={{ objectFit: "cover", objectPosition: "center" }} />
        <Box bgColor="rgba(0, 0, 0, 0.5)" position="relative">
          <Container
            as="section"
            maxW={1536}
            mx="auto"
            pt="80px"
            color="#fff"
            borderRadius="xl"
            boxShadow="xl"
            px={10}
            textAlign={["center", "center", "left"]}
            height={["100vh", "100vh", "650px"]}
          >
            <SimpleGrid columns={[1, 1, 1, 2]} gap={10} position="relative">
              <GridItem as={Stack} spacing={5} color="white">
                <Heading
                  bgClip="text"
                  size="2xl"
                  bgGradient="linear(to-l, #60a5fa, #818cf8)"
                  color="transparent"
                >{appData?.appName}</Heading>
                <Text fontSize="lg">Create your stunning portfolio for free on our ad-free and user-friendly platform.</Text>
                <Text color='#7dd3fc'>Join over 20 users who have already crafted their professional portfolios with us!</Text>
                <Text fontWeight='semibold'>3 Simple Steps to Showcase Your Work:</Text>
                <FeaturesList />
              </GridItem>
              <GridItem>
                <Stack alignItems="center">
                  <Text fontSize="2xl" fontWeight="semibold" mb={3}>Take a look -</Text>
                  {authorMetaData?.username && (
                    <Button as={Link} href={`/p/${authorMetaData?.username}`} colorScheme='purple'>Visit developer portfolio</Button>
                  )}
                  {session?.user ? (
                    <Stack textAlign="center" spacing={5}>
                      <Link href={`/p/${session.user.name}`} _hover={{ textDecoration: "none" }}>
                        <Button colorScheme='linkedin'>Visit your portfolio</Button>
                      </Link>
                      <Link href="/profile" _hover={{ textDecoration: "none" }}>
                        <Button colorScheme='whatsapp'>Go to profile</Button>
                      </Link>
                    </Stack>
                  ) : (
                    <SignInButton />
                  )}
                </Stack>
              </GridItem>
            </SimpleGrid>

          </Container>
        </Box>
      </Box>

      <Container as="section" maxW={1536} mx="auto" py={10}>
        <Heading mb={2} size="xl">Latest User Overview</Heading>
        <Divider />
        <TableContainer mt={5}>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Full name</Th>
                <Th>Created Time</Th>
                <Th>Views</Th>
              </Tr>
            </Thead>
            <Tbody>
              {allUsersMetaData?.map((data, index) => (
                <Tr key={index}>
                  <Td>
                    <Link href={`/p/${data.username}`} className='text-blue-500 hover:text-blue-700 transition-all'>{data.firstName} {data.lastName}</Link>
                  </Td>
                  <Td>
                    {formatDate(data.joinedOn as Date)}
                  </Td>
                  <Td>{data.views}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  )
}
