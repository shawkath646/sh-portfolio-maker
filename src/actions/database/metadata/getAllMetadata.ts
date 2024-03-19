import { cache } from 'react';
import { QueryDocumentSnapshot, QuerySnapshot } from 'firebase-admin/firestore';
import { db } from '@/config/firebase.config';
import timeStampToDate from '@/utils/timeStampToDate';
import { MetaDataType } from '@/types/types';


const getAllMetadata = cache(async() => {
    const metadataSnapshot: QuerySnapshot = await db.collection('metadata').get();
    if (metadataSnapshot.empty) return null;
    const metadataArray: MetaDataType[] = metadataSnapshot.docs.map((doc: QueryDocumentSnapshot) => {
        const data = doc.data() as MetaDataType;
        return {...data, joinedOn: timeStampToDate(data.joinedOn)};
    });

    return metadataArray;
})

export default getAllMetadata;