"use server";
import { db, storage } from "./firebase";

const bucket = storage.bucket('sh-portfolio-97faf.appspot.com');

const farFutureDate = new Date();
farFutureDate.setFullYear(farFutureDate.getFullYear() + 10);

function isBase64(str) {
    return /^data:image\/[a-zA-Z]*;base64,/.test(str);
}




const loggedInUserName = 'shawkath646';


// Returns { introData, quickLinks[] }

export async function getIntroData(username = loggedInUserName) {
    try {
      const introRef = db.collection('intro').doc(username);
      const introData = await introRef.get();
  
      const quickLinksRef = introRef.collection('quickLinks');
      const quickLinksSnapshot = await quickLinksRef.get();
  
      const quickLinksData = [];
      quickLinksSnapshot.forEach((doc) => {
        quickLinksData.push(doc.data());
      });
  
      return {
        status: {
          type: true,
          message: 'Data fetched successfully',
        },
        data: {
          intro: introData.data(),
          quickLinks: quickLinksData,
        },
      };
    } catch (error) {
      return {
        status: {
          type: false,
          message: error.toString(),
        },
        data: {},
      };
    }
}
  
  

export async function updateIntroData(introData, selectedImage) {
    const image = bucket.file(`intro-main-${loggedInUserName}`);
  
    const imageExists = await image.exists();
  
    if ((!introData.image || selectedImage) && imageExists[0]) await image.delete();
  
    if (selectedImage) {
      const base64Data = selectedImage.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
  
      const imageSizeInBytes = buffer.length;
      const maxSizeInBytes = 5 * 1024 * 1024;
  
      if (imageSizeInBytes <= maxSizeInBytes) {
        await image.save(buffer, {
          metadata: {
            contentType: 'image/jpeg'
          }
        });
  
        const downloadURL = await image.getSignedUrl({ action: 'read', expires: farFutureDate.toISOString() });
  
        introData.image = downloadURL[0];
      } else {
        throw new Error('Selected image size exceeds 5MB limit');
      }
    }
    await db.collection('intro').doc(loggedInUserName).set(introData, { merge: true });
}
  
export async function updateQuickLinksItem(quickLinksData) {
    if (quickLinksData.length >= 5) throw new Error('Maximum 5 quick links allowed');
    const quickLinksRef = db.collection('intro').doc(loggedInUserName).collection('quickLinks');
    const batch = db.batch();
  
    // Remove all existing items
    const oldQuickLinksSnapshot = await quickLinksRef.get();
    oldQuickLinksSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
  
    // Add all new items without specifying IDs
    quickLinksData.forEach((quickLink) => {
      const newQuickLinkRef = quickLinksRef.doc(); // Firestore will generate a unique ID
      batch.set(newQuickLinkRef, quickLink);
    });
  
    await batch.commit();
}
  

export async function getDreamItems(username = loggedInUserName) {
    try {
      const dreamDocRef = db.collection('dream').doc(username);
  
      const dreamDocSnapshot = await dreamDocRef.get();
      const { showHeading } = dreamDocSnapshot.data() || { showHeading: false };
  
      const dreamDataCollectionRef = dreamDocRef.collection('dreamData');
      const dreamDataSnapshot = await dreamDataCollectionRef.get();
      const dreamData = dreamDataSnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
  
      return {
        status: {
          type: true,
          message: 'Data fetched successfully',
        },
        data: {
          showHeading,
          dreamData,
        },
      };
    } catch (error) {
      return {
        status: {
          type: false,
          message: error.toString(),
        },
        data: {},
      };
    }
}
  

export async function addDreamData(dreamData, showHeading) {

  await db.collection('dream').doc(loggedInUserName).set({ showHeading });

  dreamData.forEach(async (data) => {
    if (data.image.includes('base64')) {
        const base64Image = data.image.replace(/^data:image\/\w+;base64,/, '');
        data.image = '';

        const imageSize = Buffer.byteLength(base64Image, 'base64');
        if (imageSize > 2 * 1024 * 1024) throw new Error('Image size exceeds 2MB limit.');

        const docRef = db.collection('dream').doc(loggedInUserName).collection('dreamData').doc();
        await docRef.set(data);

        const firestoreGeneratedId = docRef.id;

        const imageName = `dreamData-${loggedInUserName}-${firestoreGeneratedId}`;
        const image = bucket.file(imageName);
        await image.save(Buffer.from(base64Image, 'base64'), {
            metadata: {
                contentType: 'image/jpeg'
            }
        });

        const downloadURL = await image.getSignedUrl({ action: 'read', expires: farFutureDate.toISOString() });

        await docRef.update({
            image: downloadURL[0],
            id: firestoreGeneratedId
        });
    }
  });
}

export async function removeDreamData(idList) {
  idList.forEach(async (id) => {
    const imageName = `dreamData-${loggedInUserName}-${id}`;
    const image = bucket.file(imageName);

    const [exists] = await image.exists();

    if (exists) await image.delete();

    const docRef = db.collection('dream').doc(loggedInUserName).collection('dreamData').doc(id);
    const docSnapshot = await docRef.get();

    if (docSnapshot.exists) await docRef.delete();
  });
}
  



export async function getSkillsItems(username = loggedInUserName) {
  try {
      const categoriesRef = db.collection('skills').doc(username);
      const categoriesDoc = await categoriesRef.get();
      const categoriesData = categoriesDoc.data().categories;

      const skillsDataSnapshot = await db.collection('skills').doc(username).collection('skillsData').get();

      const skillsData = skillsDataSnapshot.docs.map(doc => {
          const data = doc.data();
          return { ...data, id: doc.id };
      });

      return {
        categoriesData,
        skillsData
      };
  } catch (error) {
      console.error('Error fetching skills items:', error);
      return {};
  }
}

export async function addSkillsItems(categories, skillsData) {
  
}


export async function getMiniGalleryItems() {
    const miniGallerySnapshot = await db.collection('miniGallery').get();
    return miniGallerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addMiniGalleryItems(props) {
    return new Promise(async (resolve, reject) => {
        try {
            const docRef = db.collection('miniGallery');
            for (let data of props) {
                const id = (await docRef.add(data)).id;
                data.id = id;

                if (isBase64(data.image)) {
                    const fileRef = bucket.file(id);
                    const base64Data = data.image.replace(/^data:image\/[a-zA-Z]*;base64,/, "");
                    const buffer = Buffer.from(base64Data, 'base64');
                    await fileRef.save(buffer);
                    const signedUrls = await fileRef.getSignedUrl({ action: 'read', expires: farFutureDate.toISOString() });
                    data.image = signedUrls[0];
                }
                await docRef.doc(id).update(data);
            }
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

export async function removeMiniGalleryItems(props) {

    return new Promise(async (resolve, reject) => {
        try {
            for (const data of props) {
                const docRef = db.collection('miniGallery').doc(data);
                await docRef.delete();

                const image = bucket.file(data);

                const imageExists= await image.exists();

                if (imageExists[0]) {
                    await image.delete();
                }
            }
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

export async function getContactsData() {
    const contactsSnapshot = await db.collection('contacts').get();
    const contactsData = contactsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const primary = contactsData.find((item) => item.id === '5EucUmu3z6NXbrslWQ46');
    const secondary = contactsData.filter((item) => item.id !== '5EucUmu3z6NXbrslWQ46');

    return { primary, secondary };
}

export async function updatePrimaryContactsData(data, selectedImage) {
    const image = bucket.file('contacts-primary');

    const imageExists = await image.exists();

    if ((!data.image || selectedImage ) && imageExists[0]) await image.delete();

    if (selectedImage) {
        const base64Data = selectedImage.replace(/^data:image\/\w+;base64,/, '');

        const buffer = Buffer.from(base64Data, 'base64');

        await image.save(buffer);

        const downloadURL = await image.getSignedUrl({ action: 'read', expires: farFutureDate.toISOString() });

        data.image = downloadURL[0];

    }
    await db.collection('contacts').doc('5EucUmu3z6NXbrslWQ46').update(data);
}

export async function addSecondaryContactsItems(props) {
    return new Promise(async (resolve, reject) => {
        try {
            const docRef = db.collection('contacts');
            for (let data of props) {
                const id = (await docRef.add(data)).id;
                data.id = id;

                if (isBase64(data.image)) {
                    const fileRef = bucket.file(id);
                    const base64Data = data.image.replace(/^data:image\/[a-zA-Z]*;base64,/, "");
                    const buffer = Buffer.from(base64Data, 'base64');
                    await fileRef.save(buffer);
                    const signedUrls = await fileRef.getSignedUrl({ action: 'read', expires: farFutureDate.toISOString() });
                    data.image = signedUrls[0];
                }
                await docRef.doc(id).update(data);
            }
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

export async function removeSecondaryContactsItems(props) {
    return new Promise(async (resolve, reject) => {
        try {
            for (const data of props) {
                const docRef = db.collection('contacts').doc(data);
                await docRef.delete();

                const image = bucket.file(data);

                const imageExists= await image.exists();

                if (imageExists[0]) {
                    await image.delete();
                }
            }
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}
