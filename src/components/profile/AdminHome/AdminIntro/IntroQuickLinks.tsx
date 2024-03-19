import Link from 'next/link';
import { useState } from 'react';
import {
    Box,
    Button,
    Center,
    Flex,
    FormControl,
    FormLabel,
    Icon,
    Input,
    Spacer,
    Text,
    UnorderedList
} from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion';
import { AiOutlineDelete } from 'react-icons/ai';




export default function IntroQuickLinks({ quickLinks, setQuickLinks }) {

    const [value, setValue] = useState({
        label: '',
        href: ''
    });

    const handleAdd = () => {
        setQuickLinks(prev => ([...prev, value]));
        setValue({
            label: '',
            href: ''
        });
    }

    const removeItem = (item) => {
        const updatedItems = quickLinks.filter((currentItem) => currentItem !== item);        
        setQuickLinks(updatedItems);
    };

    return (
        <FormControl marginBottom={5}>
            <FormLabel>Quick Links :</FormLabel>
            {quickLinks.length > 0 && (
                <UnorderedList
                    marginBottom={5}
                    marginLeft={75}
                >
                    <AnimatePresence>
                        {quickLinks.map((item, index) => 
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Flex alignItems="center">
                                    <Box>
                                        <Text>{item.label}</Text>
                                        <Text
                                            as={Link}
                                            marginLeft={30}
                                            href={item.href}
                                            color="blue.600"
                                        >
                                            {item.href}
                                        </Text>
                                    </Box>
                                    
                                    <Spacer />
                                    {item.href !== '#downloadcv' && <Icon as={AiOutlineDelete} onClick={() => removeItem(item)} color="red.600" cursor="pointer" />}
                                </Flex>
                            </motion.li>
                        )}
                    </AnimatePresence>
                </UnorderedList>
            )}
            <Input
                type='text'
                value={value.label}
                onChange={event => 
                    setValue(prev => ({...prev, label: event.target.value}))
                }
                onKeyDown={event => 
                    (event.key === "Enter" || event.keyCode === 13) && handleAdd()
                }
                placeholder="Label"
                marginBottom={5}
            />
            <Input
                type='text'
                value={value.href}
                onChange={event => 
                    setValue(prev => ({...prev, href: event.target.value}))
                }
                onKeyDown={event => 
                    (event.key === "Enter" || event.keyCode === 13) && handleAdd()
                }
                placeholder="Link"
                marginBottom={5}
            />            
            <Center>
                <Button
                    isDisabled={value.label.length < 1 || value.href.length < 1}
                    marginBottom={3}
                    onClick={handleAdd}
                >
                    Add
                </Button>
            </Center>
        </FormControl>
    );
}