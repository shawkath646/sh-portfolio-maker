import { TimestampFieldValue } from "@/types/types";
import { Timestamp } from "firebase-admin/firestore";

export default function timeStampToDate(fieldValue: TimestampFieldValue | Timestamp | Date): Date {
    if (fieldValue instanceof Date) return fieldValue;
    if (fieldValue instanceof Timestamp) return fieldValue.toDate();
    const timestamp = new Timestamp(fieldValue._seconds, fieldValue._nanoseconds);
    return timestamp.toDate();
};
