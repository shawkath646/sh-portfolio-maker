import { cache } from 'react';
import { QueryDocumentSnapshot, QuerySnapshot } from 'firebase-admin/firestore';
import { db } from '@/config/firebase.config';
import timeStampToDate from '@/utils/timeStampToDate';
import { MetaDataType, ViewersType } from '@/types/types';

const getAllMetadata = cache(async () => {
    const metadataSnapshot: QuerySnapshot = await db.collection('metadata').get();
    if (metadataSnapshot.empty) return null;

    const metadataArrayPromises: Promise<MetaDataType>[] = metadataSnapshot.docs.map(async (doc: QueryDocumentSnapshot) => {
        const data = doc.data() as MetaDataType;
        const viewersSnapshot = await doc.ref.collection("viewers").get();

        const viewersDataPromises: Promise<ViewersType>[] = viewersSnapshot.docs.map(async (doc) => {
            const viewersData = doc.data() as ViewersType;
            viewersData.firstViewedOn = timeStampToDate(viewersData.firstViewedOn);
            viewersData.lastViewedOn = timeStampToDate(viewersData.lastViewedOn);
            return viewersData;
        });

        data.viewers = await Promise.all(viewersDataPromises);
        data.joinedOn = timeStampToDate(data.joinedOn);
        return data;
    });

    const metadataArray: MetaDataType[] = await Promise.all(metadataArrayPromises);
    return metadataArray;
});


export default getAllMetadata;