"use client";
import Image from "next/image";
import { useState } from "react";
import { Box, Button, Card, CardBody, CardHeader, Divider, FormControl, FormLabel, GridItem, Heading, Icon, Input, Menu, MenuButton, MenuItem, MenuList, SimpleGrid, Stack, StackDivider, Text } from "@chakra-ui/react";
import PicUpload from "@/components/universal/PicUpload";
import { AiOutlineDelete } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import randomId from "@/lib/randomId";

export default function AdminSkills({ fetchedData }) {

    const initialSkillValue = {
        name: "",
        image: "",
        category: "",
    }

    const [skillsData, setSkillsData] = useState(fetchedData.skillsData);
    const [categories, setCategories] = useState(fetchedData.categoriesData);

    const [skillValue, setSkillValue] = useState(initialSkillValue);
    const [categoryValue, setCategoryValue] = useState('');
    

    const addCategory = () => {
        const categoryData = {
            id: randomId(12),
            name: categoryValue
        }
        setCategories(prev => [...prev, categoryData]);
        setCategoryValue('');
    }

    const handleSkillAdd = () => {
        setSkillsData(prev => [...prev, skillValue]);
        setSkillValue(initialSkillValue);
    };

    const categoryButtonName = categories.find(obj => obj.id === skillValue.category)?.name || '';

    return (
        <section className="pt-16 px-2 mb-24">
            <Heading as='h2' textAlign="center" pb={2}>Skills</Heading>
            <Divider />
            <SimpleGrid columns={[1, 1, 1, 7, 7]} mt={5} gap={5}>
                <GridItem as={Stack} direction="row" colSpan={3}>
                    <Box minW={420} mx="auto">
                        <FormControl>
                            <Stack direction="row">
                                <Input value={categoryValue} placeholder="Add new category" onChange={event => setCategoryValue(event.target.value)} />
                                <Button colorScheme="purple" onClick={addCategory}>Add</Button>
                            </Stack>
                            <FormLabel mt={2}>Name :</FormLabel>
                            <Input value={skillValue.name} onChange={event => setSkillValue(prev => ({...prev, name: event.target.value}))} />
                        </FormControl>
                        <Stack direction="row" align="end" justify="space-between" mt={5}>
                            <Stack>
                                <Menu closeOnSelect={false}>
                                    <MenuButton as={Button} rightIcon={<RiArrowDropDownLine size={25} />}>{categoryButtonName || "Select Category"}</MenuButton>
                                    <MenuList>
                                        {categories.map((data, key) => (
                                            <MenuItem key={key} onClick={() => setSkillValue(prev => ({...prev, category: data.id}))}>{data.name}</MenuItem>
                                        ))}
                                    </MenuList>
                                </Menu>
                                <PicUpload label="Logo :" selectedImage={skillValue.image} onChange={image => setSkillValue(prev => ({...prev, image}))} />
                            </Stack>
                            <Stack w={200}>
                                <Button onClick={handleSkillAdd}>Add</Button>
                                <Button colorScheme='teal' variant='solid'>Update</Button>
                            </Stack>
                        </Stack>
                    </Box>
                    <Divider orientation='vertical' h="full" mx={3} className="hidden lg:block" />
                </GridItem>
                <GridItem as={Stack} spacing={5} colSpan={4}>
                    {categories.map((data, key) => (
                        <Card key={key} w={450} mx="auto">
                            <CardHeader as={Stack} direction="row" align="center" justify="space-between">
                                <Heading size='md' textTransform="uppercase">{data.name}</Heading>
                                <Button
                                    leftIcon={<Icon as={AiOutlineDelete} size={20} />}
                                    variant="outline"
                                    onClick={() => setCategories(prev => prev.filter(item => item.id !== data.id))}
                                    colorScheme="red"
                                >
                                    Delete
                                </Button>
                            </CardHeader>
                            <CardBody>
                                <Stack divider={<StackDivider />} spacing='4'>
                                    {skillsData.filter(item => item.category === data.id).map((data, key) => (
                                        <Stack key={key} direction="row" align="center">
                                            {data.image && <Image src={data.image} alt="Skill image" height={50} width={50} />}
                                            <Text textTransform='uppercase'>{data.name}</Text>
                                        </Stack>
                                    ))}
                                </Stack>
                            </CardBody>
                        </Card>
                    ))}
                </GridItem>
            </SimpleGrid>
        </section>
    );
}