"use client";
import { Box, Button, FormLabel, Icon, Menu, MenuButton, MenuItem, MenuList, Stack, Text } from "@chakra-ui/react";
import uiColorList from "@/lib/uiColorList";
import { MdArrowDropDown } from 'react-icons/md';


export default function ColorSelect({ value, onChange, ...props }) {

    const foundObject = uiColorList.find(item => item.value === value);
    const colorName = foundObject ? foundObject.name : uiColorList[0].name;

    return (
        <Box {...props}>
            <FormLabel>Variant :</FormLabel>
            <Menu isLazy>
                <MenuButton as={Button} rightIcon={<Icon as={MdArrowDropDown} />}>{colorName}</MenuButton>
                <MenuList maxH={280} overflow="scroll" className="scrollbar-hide">
                    {uiColorList.map((data, index) => (
                        <MenuItem
                            key={index}
                            as={Stack}
                            direction="row"
                            align="center"
                            justify="space-between"
                            onClick={() => onChange(data.value)}
                        >
                            <Text>{data.name}</Text>
                            <Box height={7} width={7} rounded={5} bgColor={data.value}></Box>
                        </MenuItem>
                    ))}
                    
                </MenuList>
            </Menu>
        </Box>
    );
}