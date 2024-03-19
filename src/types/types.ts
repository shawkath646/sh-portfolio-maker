import { Timestamp } from "firebase-admin/firestore";


export interface TimestampFieldValue {
    _seconds: number;
    _nanoseconds: number;
}


export interface MetaDataType {
    firstName: string;
    lastName: string;
    joinedOn: Date | Timestamp;
    username: string;
    views: number;
    isSuspended: boolean;
    id: string;
    contact: string;
}

export interface IntroType {
    fullName: string;
    introPic: string;
    description: string;
    title: string[];
    quickLinks: QuickLinksType[];
    skillsCategories: SkillsCategoriesType[];
    socialItems: string[];
}

export interface QuickLinksType {
    href: string;
    name: string;
}

export interface SkillsCategoriesType {
    categoryId: number;
    name: string;
}

export interface SkillItemsType {
    categoryId: number;
    icon: string;
    id: string;
    index: number;
    name: string;
}

export interface FeaturedItemsType {
    description: string;
    icon: string;
    id: string;
    index: number;
    title: string;
    color: string;
}

export interface HomeDataType {
    intro: IntroType;
    featuredItems: FeaturedItemsType[];
    skillItems: SkillItemsType[];
}

export interface EducationType {
    degree: string;
    field: string;
    grade: string;
    institute: string;
    index: number;
    startsFrom: TimestampFieldValue | Timestamp | Date;
    endsOn: TimestampFieldValue | Timestamp | Date | null;
    type: string;
    id: string;
    description: string;
}

export interface WorkExperienceType {
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
    index: number;
}

export interface VolunteeringType {
    organization: string;
    role: string;
    purpose: string;
    startsFrom: TimestampFieldValue | Timestamp | Date;
    endsOn: TimestampFieldValue | Timestamp | Date | null;
    id: string;
    index: number;
    description: string;
}

export interface ReawardsType {
    title: string;
    issuedBy: string;
    issuedOn: TimestampFieldValue | Timestamp | Date;
    index: number;
    id: string;
    description: string;
}

export interface PortfolioDataType {
    education: EducationType[];
    workExperience: WorkExperienceType[];
    volunteering: VolunteeringType[];
    reawards: ReawardsType[];
}

export interface ProjectsDataType {
    id: string;
    name: string;
    description: string;
    icon: string;
    liveLink: string;
    sourceLink: string;
    type: string;
    startsFrom: TimestampFieldValue | Timestamp | Date;
    endsOn: TimestampFieldValue | Timestamp | Date | null;
    images: string[];
}

export interface GalleryItemType {
    id: string;
    collectionId: number;
    height: number;
    width: number;
    src: string;
}

export interface CollectionType {
    collectionId: number;
    name: string;
}

export interface GalleryDataType {
    collection: CollectionType[];
    galleryItems: GalleryItemType[];
}

export interface ResponseType {
    status: "success" | "error" | "loading" | "registred";
    message: string;
}

export interface PicUploadType {
    currentImage?: string;
    onRemove: () => void;
    onChange: () => void;
    selectedImage: File | null;
    label: string;
}