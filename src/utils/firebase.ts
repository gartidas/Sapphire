import { projectFirestore, Query } from "../firebase/config";

export const deleteCollection = async (
  collectionPath: string
): Promise<void> => {
  const collectionRef = projectFirestore.collection(collectionPath);

  const deleteQueryBatch = async (
    query: Query,
    resolve: () => void
  ): Promise<void> => {
    const snapshot = await query.get();

    if (snapshot.empty) {
      resolve();
      return;
    }

    const batch = projectFirestore.batch();
    snapshot.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();

    process.nextTick(() => {
      deleteQueryBatch(query, resolve);
    });
  };

  return new Promise((resolve, reject) => {
    const query = collectionRef.limit(500);
    deleteQueryBatch(query, resolve).catch(reject);
  });
};
