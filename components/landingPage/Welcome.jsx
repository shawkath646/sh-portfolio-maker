'use client'
import { SimpleGrid, GridItem, Stack, Heading, Text, List, ListItem, ListIcon, Image } from '@chakra-ui/react';
import { CiCircleCheck } from 'react-icons/ci';
import bannerImage from "@/assets/banner_1980x1080.png";

export default function Welcome() {
    return (
        <SimpleGrid as="section" columns={[1, 1, 1, 2]} gap={10}>
          <GridItem as={Stack} spacing={5}>
            <Heading>Welcome to <span className='text-[#0d7bb8]'>SH PORTFOLIO MAKER</span></Heading>
            <Text fontSize='xl'>Create your stunning portfolio for free on our ad-free and user-friendly platform.</Text>
            <Text color='#8311f5'>Join over 20 users who have already crafted their professional portfolios with us!</Text>
            <Text fontWeight='semibold'>3 Simple Steps to Showcase Your Work:</Text>
            <List spacing={3} pl={5} mt={3}>
              <ListItem as={Stack} alignItems="center" direction="row">
                <ListIcon as={CiCircleCheck} />
                <Text>Login</Text>
              </ListItem>
              <ListItem as={Stack} alignItems="center" direction="row">
                <ListIcon as={CiCircleCheck} />
                <Text>Add Your Portfolio Data</Text>
              </ListItem>
              <ListItem as={Stack} alignItems="center" direction="row">
                <ListIcon as={CiCircleCheck} />
                <Text>Share with the World</Text>
              </ListItem>
            </List>
          </GridItem>
          <GridItem>
            <Image src={bannerImage.src} alt="Banner" width="auto" height="auto" />
          </GridItem>
        </SimpleGrid>
    );
}