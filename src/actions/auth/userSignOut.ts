"use server";
import { signOut } from "@/app/auth";

export default async function userSignOut() {
    return await signOut({ redirectTo: "/" });
}