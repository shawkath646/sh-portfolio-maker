"use client";
// Optimized and ready
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Link } from '@/lib/ChakraUINextJsClient';
import { Button, Checkbox, Text } from "@/lib/ChakraUIReactClient";


export default function SignInButton({ brandIcon, brandName }: { brandIcon?: string; brandName?: string }) {

    const [isAccepted, setAccepted] = useState(false);

    return (
        <>
            <Button
                isDisabled={!isAccepted}
                mx={["auto", "auto", "unset"]}
                display="block"
                onClick={() => signIn("cloudburst-lab")}
                leftIcon={brandIcon ? <Image src={brandIcon} alt={`${brandName} icon`} height={20} width={38} /> : undefined}
            >
                Sign in with {brandName}
            </Button>
            <Checkbox isChecked={isAccepted} onChange={event => setAccepted(event.target.checked)}>
                <Text className="text-gray-500 text-sm" maxW={500} my={6}>By logging in, I agree to our&nbsp;
                    <Link
                        href="/privacy-policy"
                        color="#3b82f6"
                        _hover={{ color: "#2563eb", transition: "color 0.3s ease" }}
                    >
                        Privacy Policy
                    </Link>
                    &nbsp;and&nbsp;
                    <Link
                        href="/privacy-policy"
                        color="#3b82f6"
                        _hover={{ color: "#2563eb", transition: "color 0.3s ease" }}
                    >
                        Terms & Conditions
                    </Link>
                    , ensuring a secure and respectful environment for all users.</Text>
            </Checkbox>
        </>
    );
}