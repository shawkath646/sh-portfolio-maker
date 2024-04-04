import { cache } from 'react';
import { QueryDocumentSnapshot, QuerySnapshot } from 'firebase-admin/firestore';
import { db } from '@/config/firebase.config';
import timeStampToDate from '@/utils/timeStampToDate';
import { MetaDataType } from '@/types/types';

const getAllMetadata = cache(async () => {
    const metadataSnapshot: QuerySnapshot = await db.collection('metadata').get();

    const metadataArrayPromises: Promise<MetaDataType>[] = metadataSnapshot.docs.map(async (doc: QueryDocumentSnapshot) => {
        const data = doc.data() as MetaDataType;
        const viewersSnapshot = await doc.ref.collection("viewers").get();

        data.viewers = viewersSnapshot.docs.length;
        data.joinedOn = timeStampToDate(data.joinedOn);
        return data;
    });

    const metadataArray: MetaDataType[] = await Promise.all(metadataArrayPromises);
    return metadataArray;
});


export default getAllMetadata;