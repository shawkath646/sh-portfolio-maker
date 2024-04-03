import { Timestamp } from "firebase-admin/firestore";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export interface TimestampFieldValue {
    _seconds: number;
    _nanoseconds: number;
}

export interface ViewerItemType {
    firstViewedOn: TimestampFieldValue | Timestamp | Date;
    lastViewedOn: TimestampFieldValue | Timestamp | Date;
    id: string;
    name: string;
    username: string;
}

export interface MetaDataType {
    firstName: string;
    lastName: string;
    joinedOn: Date | Timestamp;
    username: string;
    isSuspended: boolean;
    id: string;
    contact: string;
    viewers: number;
}

export interface IntroType {
    fullName: string;
    introPic: string;
    description: string;
    title: string[];
    quickLinks: QuickLinksType[];
    skillCategories: SkillCategoryType[];
    socialItems: string[];
}

export interface QuickLinksType {
    href: string;
    name: string;
    color: string;
}

export interface SkillCategoryType {
    categoryId: string;
    name: string;
}

export interface SkillItemType {
    categoryId: string;
    icon: string;
    id: string;
    name: string;
}

export interface FeaturedItemType {
    description: string;
    icon: string;
    id: string;
    title: string;
    color: string;
}

export interface MiniGalleryItemType {
    src: string;
    height: number;
    width: number;
    id: string;
}

export interface FileObjectType {
    height: number;
    width: number;
    src: string;
}

export interface HomeDataType {
    intro: IntroType;
    featuredItems: FeaturedItemType[];
    skillItems: SkillItemType[];
    miniGalleryItems: MiniGalleryItemType[];
}

export interface EducationItemType {
    degree: string;
    field: string;
    grade: string;
    institute: string;
    startsFrom: TimestampFieldValue | Timestamp | Date;
    endsOn: TimestampFieldValue | Timestamp | Date | null;
    type: string;
    id: string;
    description: string;
}

export interface WorkExperienceItemType {
    companyName: string;
    role: string;
    skills: string[];
    workType: string;
    location: string;
    locationType: string;
    industry: string;
    startsFrom: TimestampFieldValue | Timestamp | Date;
    endsOn: TimestampFieldValue | Timestamp | Date | null;
    description: string;
    id: string;
}

export interface VolunteeringItemType {
    organization: string;
    role: string;
    purpose: string;
    startsFrom: TimestampFieldValue | Timestamp | Date;
    endsOn: TimestampFieldValue | Timestamp | Date | null;
    id: string;
    description: string;
}

export interface ReawardAndAchievementItemType {
    title: string;
    issuedBy: string;
    issuedOn: TimestampFieldValue | Timestamp | Date;
    id: string;
    description: string;
}

export interface PortfolioDataType {
    educationItems: EducationItemType[];
    workExperienceItems: WorkExperienceItemType[];
    volunteeringItems: VolunteeringItemType[];
    reawardAndAchievementItems: ReawardAndAchievementItemType[];
}

export interface ProjectItemType {
    id: string;
    name: string;
    description: string;
    icon: string;
    liveLink: string;
    sourceLink: string;
    type: string;
    startsFrom: TimestampFieldValue | Timestamp | Date;
    endsOn: TimestampFieldValue | Timestamp | Date | null;
    coverImage: string;
}

export interface GalleryItemType {
    id: string;
    collectionId: string;
    height: number;
    width: number;
    src: string;
}

export interface GalleryCollectionType {
    collectionId: string;
    name: string;
}

export interface GalleryDataType {
    collection: GalleryCollectionType[];
    galleryItems: GalleryItemType[];
}

export interface AddressType {
    line1: string;
    line2: string;
}

export interface EventItemType {
    timestamp: TimestampFieldValue | Timestamp | Date;
    title: string;
    description: string;
    id: string;
}

export interface PersonalDataType {
    dateOfBirth: TimestampFieldValue | Timestamp | Date | null;
    interestedIn: string[];
    languages: string[];
    presentAddress: AddressType;
    permanentAddress: AddressType;
    maritalStatus: string;
}

export interface PreferencesDataType {
    personalData: PersonalDataType;
    eventItems: EventItemType[];
}

export interface ResponseType {
    status: "success" | "error" | "loading" | "registred";
    message: string;
}
