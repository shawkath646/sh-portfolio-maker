import { NextAuthConfig } from "next-auth";
import CloudBurstLab from "next-auth-provider-cloudburst-lab"


export const authConfig = {
    providers: [
        CloudBurstLab
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/sign-in',
    },
    callbacks: {
        async jwt({ token, profile }) {
            if (profile) {
                const {
                    email_verified,
                    given_name,
                    family_name,
                    gender,
                    dateOfBirth,
                    country,
                    phoneNumber,
                    phoneNumberVerified,
                    isEnterpriseUser,
                    name
                } = profile;
                token.id = profile.id;
                token.emailVerified = email_verified;
                token.firstName = given_name;
                token.lastName = family_name;
                token.gender = gender;
                token.dateOfBirth = dateOfBirth;
                token.country = country;
                token.phoneNumber = phoneNumber;
                token.phoneNumberVerified = phoneNumberVerified;
                token.isEnterpriseUser = isEnterpriseUser;
                token.username = name;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id as string;
            session.user.emailVerified = token.emailVerified as Date;
            session.user.dateOfBirth = token.dateOfBirth as Date;
            session.user.firstName = token.firstName as string;
            session.user.lastName = token.lastName as string;
            session.user.phoneNumber = token.phoneNumber as string;
            session.user.country = token.country as string;
            session.user.gender = token.gender as string;
            session.user.isEnterpriseUser = token.isEnterpriseUser as boolean;
            session.user.phoneNumberVerified = token.phoneNumberVerified as boolean;
            session.user.username = token.username as string;
            return session;
        }
    },
    session: {
        strategy: "jwt",
    },
} satisfies NextAuthConfig;
