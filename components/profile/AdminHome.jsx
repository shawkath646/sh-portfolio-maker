import 'server-only';
import AdminDream from "./AdminHome/AdminDream";
import AdminIntro from "./AdminHome/AdminIntro";
import AdminSkills from './AdminHome/AdminSkills';
import AdminMiniGallery from "./AdminHome/AdminMiniGallery";
import AdminContacts from "./AdminHome/AdminContacts";
import { getContactsData, getDreamItems, getIntroData, getMiniGalleryItems, getSkillsItems } from '@/lib/database';



export default async function AdminHome() {

    const introData = await getIntroData();
    const dreamItems = await getDreamItems();
    const skillsData = await getSkillsItems();
    // const miniGalleryItems = await getMiniGalleryItems();
    // const contactsData = await getContactsData();

    return (
        <>
            <AdminIntro fetchedData={introData} />
            <AdminDream fetchedData={dreamItems} />
            <AdminSkills fetchedData={skillsData} />
            {/* <AdminMiniGallery data={miniGalleryItems} />
            <AdminContacts data={contactsData} /> */}
        </>
    );
}