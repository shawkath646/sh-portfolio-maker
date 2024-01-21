'use client'
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { Button, Stack } from '@chakra-ui/react';
import { FaArrowRightLong } from "react-icons/fa6";

export default function ButtonsContainer({ developerData }) {

    const { data: session } = useSession();

    return (
        <Stack my={10} direction="row" alignItems="center" justifyContent="center">
          <Button as={Link} href={`${process.env.NEXT_PUBLIC_BASE_URL}/p/${developerData?.username}`} colorScheme='purple' >Visit developer portfolio</Button>
          {session ? (
            <Button as={Link} href={`${process.env.NEXT_PUBLIC_BASE_URL}/p/${session.user?.username}`} colorScheme='linkedin' >Visit your portfolio</Button>
          ) : (
            <Button colorScheme='blue' rightIcon={<FaArrowRightLong size={20} />} onClick={() => signIn()}>Create your now</Button>
          )}
        </Stack>
    );
}