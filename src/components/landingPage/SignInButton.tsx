'use client';
import { signIn } from 'next-auth/react';
import { Button } from '@chakra-ui/react';
import { FaArrowRightLong } from "react-icons/fa6";

const SignInButton = () => (
    <Button
        colorScheme='blue'
        rightIcon={<FaArrowRightLong size={20} />}
        onClick={() => signIn()}
    >
        Create your now
    </Button>
);

export default SignInButton;