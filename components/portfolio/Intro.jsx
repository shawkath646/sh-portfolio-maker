"use client"
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Box, Text, Stack, SimpleGrid, GridItem, List, ListItem, Center, Avatar, Button, Skeleton, SkeletonText, SkeletonCircle } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import AnimatedComponent from '../universal/AnimateComponent';
import ComponentError from '../error/ComponentError';
import uiColorList from '@/lib/uiColorList';
import introBg from '../../assets/8410.jpg'
import { getIntroData } from '@/lib/database';



const baseColorNamesSet = new Set(uiColorList.map(color => color.name.split(' ')[0]));
const baseColorNames = [...baseColorNamesSet];

export default function Intro({ username }) {

    const [data, setData] = useState({ intro: {}, quickLinks: [] });
    const [status, setStatus] = useState({
        name: 'loading',
        type: true,
        message: ''
    });

    useEffect(() => {
        getIntroData(username)
        .then(recievedData => {
            if (recievedData.status.type) {
                setData(recievedData.data);
                setStatus({
                    name: 'success',
                    type: 'true'
                });
            } else {
                setStatus({
                    name: 'error',
                    type: recievedData.status.type,
                    message: recievedData.status.message
                });
            }
        }).catch(error => {
            setStatus({
                name: 'error',
                type: false,
                message: error.toString()
            })
        })
    }, []);

    const getRandomBaseColor = (props) => {
        const randomIndex = baseColorNames[props+2 % baseColorNames.length]
        return randomIndex.toLowerCase();
    };

    function FormattedName(props) {
        if (!props.name) return '';

        const nameParts = props.name.split(' ');
      
        function HighlightCharacters({ text }) {
            const charArray = text.split('');
            const highlightedIndices = [1, 7];
        
            const formattedText = charArray.map((char, index) => {
              if (highlightedIndices.includes(index)) {
                return <span key={index} className="text-violet-600">{char}</span>;
              }
              return char;
            });
        
            return formattedText;
        }
      
        return nameParts.length === 3 ? (
          <>
            <Text {...props}>
              <HighlightCharacters text={nameParts[0]} />{' '}
              <HighlightCharacters text={nameParts[1]} />
              <br />
              <HighlightCharacters text={nameParts[2]} />
            </Text>
          </>
        ) : (
          <Text {...props}>
            <HighlightCharacters text={fullName} />
          </Text>
        );
    }

    const gradientStylesLarge = {
        content: '""',
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        background: 'linear-gradient(to left, rgba(255,255,255,0) 0%, rgba(255,255,255, 1) 50%)',
    };

    const gradientStylesSmall = {
        content: '""',
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        background: 'linear-gradient(to top, rgba(255,255,255,0) 0%, rgba(255,255,255, 1) 50%)',
    };
      
    const largeScreenStyles = {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: '-1',
    };

    return (
        <section>
            {status.name === 'error' ? (
                <ComponentError message={status.message} />
            ) : (
                <AnimatedComponent
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { duration: 0.75, delayChildren: 1 } },
                    }}
                    className="relative font-bold"
                >
                    <Image src={introBg.src} alt="Intro Background" fill className="absolute -z-10 opacity object-cover " />
                    <Box position="absolute" {...largeScreenStyles} _before={gradientStylesSmall} className="lg:hidden" />
                    <Box position="absolute" {...largeScreenStyles} _before={gradientStylesLarge} className="hidden lg:block" />
                    <SimpleGrid columns={[1, 1, 1, 2]} padding={2} gap={10}>
                        <GridItem>
                            <Skeleton isLoaded={status.name === 'success'} h={6} maxW={52}>
                                <Text fontSize="2xl" color="blueviolet">Hi! 👋 I am</Text>
                            </Skeleton>
                            {status.name === 'loading' ? (
                                <>
                                    <Skeleton h={10} mt={5} maxW="450px" />
                                    <Skeleton h={10} mt={5} maxW="200px" />
                                </>
                            ) : (
                                <FormattedName name={data.intro.fullName} fontSize="5xl" textTransform="uppercase" className="ml-10 lg:ml-0" />
                            )}
                                
                            {status.name === 'loading' ? (
                                <List mt={5}>
                                    <SkeletonText maxW={400} skeletonHeight={4} />
                                </List>
                            ) : (
                                <List mt={5}>
                                    <AnimatePresence>
                                        {data.intro.title.map((e, k) => (
                                            <AnimatedComponent
                                                key={k}
                                                variants={{
                                                    initial: { opacity: 0, x: -50 },
                                                    hidden: { opacity: 0, x: -50 },
                                                    visible: { opacity: 1, x: 0, },
                                                }}
                                                transition={{ duration: 0.5, delay: 0.5 }}
                                            >
                                                <ListItem>
                                                    <Text fontSize="xl" fontWeight="bold" pl={10} color="blue">- {e}</Text>
                                                </ListItem>
                                            </AnimatedComponent>
                                        ))}
                                    </AnimatePresence>
                                </List>
                            )}
                            

                            <Stack spacing={5} direction="row" mt={10} ml={10} maxW={450} flexWrap="wrap">
                                {status.name === 'loading' ? (
                                    <>
                                        <Skeleton h={8} w={20} rounded={20} />
                                        <Skeleton h={8} w={20} rounded={20} />
                                    </>
                                ) : (
                                    <AnimatePresence>
                                        {data.quickLinks.map((e, k) => (
                                            <AnimatedComponent
                                                key={k}
                                                initial={{ scale: 0 }}
                                                animate={{scale: [0, 1], transition: { duration: 0.5, delay: 0.5 }}}
                                                exit={{ scale: 0 }}
                                            >
                                                <Link href={e.href}>
                                                    <Button as="span" colorScheme={getRandomBaseColor(k)} rounded={20}>{e.label}</Button>
                                                </Link>
                                            </AnimatedComponent>
                                        ))}
                                    </AnimatePresence>
                                )}
                            </Stack>
                        </GridItem>

                        <GridItem>
                            <Center height="full">
                                {status.name === 'loading' ? (
                                    <SkeletonCircle size={200} />
                                ) : (
                                    <AnimatedComponent
                                        variants={{
                                            hidden: { opacity: 0, y: 40 },
                                            visible: {
                                                opacity: 1,
                                                y: 0,
                                                transition: { duration: 0.5, delay: 0.5 }
                                            },
                                        }}
                                    >
                                        <Avatar name={data.intro.fullName} src={data.intro.image} size="xl" height={200} width={200} />
                                    </AnimatedComponent>
                                )}
                            </Center>
                        </GridItem>
                    </SimpleGrid>
                </AnimatedComponent>
            )}
        </section>
    );
}
