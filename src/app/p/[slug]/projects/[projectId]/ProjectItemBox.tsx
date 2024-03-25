"use client";
import { Box, Container } from "@chakra-ui/react";
import Markdown from "react-markdown";
import remarkRehype from 'remark-rehype';
import remarkGfm from 'remark-gfm';
import chakraRemarkComponents from "./chakraRemarkComponents";
import { ProjectsDataType } from "@/types/types";


const ProjectItemBox = ({ projectsData }: { projectsData: ProjectsDataType }) => (
    <Box
        as="main"
        w="full"
        bgColor="#fff"
    >
        <Container maxW={1536} mx="auto" pt={20} overflow="hidden" minHeight="75vh">
            {projectsData.description && (
                <Markdown
                    components={chakraRemarkComponents}
                    remarkPlugins={[remarkRehype, remarkGfm]}
                >
                    {projectsData.description}
                </Markdown>
            )}
        </Container>
    </Box>
);

export default ProjectItemBox;
