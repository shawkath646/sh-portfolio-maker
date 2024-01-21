import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
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

import { AiOutlineDelete } from 'react-icons/ai';

export default function IntroTitle({ title, setIntroData }) {

    const [value, setValue] = useState('');

    const addItem = () => {
        setIntroData(prev => ({
            ...prev,
            title: [...prev.title, value]
        }));
        setValue('');
    }

    const removeItem = (item) => {
        const updatedItems = title.filter((currentItem) => currentItem !== item);        
        setIntroData(prev => ({...prev, title: updatedItems}));
    };

    return (
        <FormControl marginBottom={5}>
            <FormLabel>Sub Title :</FormLabel>
            {title.length > 0 && (
                <UnorderedList marginBottom={5} marginLeft={75}>
                    <AnimatePresence>
                        {title.map((item, index) => 
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                    <Flex alignItems="center" marginY={2}>
                                        <Text>{item}</Text>
                                        <Spacer />
                                        <Icon as={AiOutlineDelete} onClick={() => removeItem(item)} color="red.600" cursor="pointer" />
                                    </Flex>
                            </motion.li>
                        )}
                    </AnimatePresence>
                </UnorderedList>
            )}
            <Input
                type='text'
                value={value}
                onChange={event =>
                    setValue(event.target.value)} onKeyDown={event => (event.key === "Enter" || event.keyCode === 13) && addItem()
                }
                marginBottom={5}
            />
            <Center>
                <Button
                    isDisabled={value.length < 1}
                    marginBottom={3}
                    onClick={addItem}
                >
                    Add
                </Button>
            </Center>
        </FormControl>
    );
}