'use server';
import { db } from "./firebase";

export default async function getDeveloperData() {
    try {
      let developerRawMetaData = {};
  
      const developerMetaDataCollectionRef = db.collection('metadata').where('role', '==', 'developer');
  
      const developerMetaData = await developerMetaDataCollectionRef.get();
  
      developerMetaData.forEach(doc => {
        developerRawMetaData = doc.data();
        developerRawMetaData.username = doc.id
      });

      return {
        fullName: developerRawMetaData.fullName,
        email: developerRawMetaData.email,
        username: developerRawMetaData.username,
        contactFB: "",
        contactLinkedIn: "",
        contactWP: "",
        contactGithub: "",
      }
  
    } catch (error) {
      console.error('Error getting developer data:', error);
      return null;
    }
  }

