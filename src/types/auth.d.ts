import { User } from 'next-auth'; // Import the default User type
import { CloudBurstLabProfile } from 'next-auth-provider-cloudburst-lab';

declare module 'next-auth' {
  interface Session {
    user: User & Partial<CloudBurstLabProfile>
  }

  interface JWT extends Partial<CloudBurstLabProfile>{}
}