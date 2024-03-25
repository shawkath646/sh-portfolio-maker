"use server";
import { signIn } from "@/app/auth";

export default async function userSignIn() {
    return await signIn();
}