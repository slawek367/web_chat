import { ref, set, child, get } from 'firebase/database';
import { User } from 'types';
import { db } from '../db';
import { Timestamp } from 'firebase/firestore';

export const useUserDb = () => {
  const createUser = async ({
    id,
    username,
    email,
    imageUrl = null,
    lastSeen,
  }: User) => {
    try {
      return await set(ref(db, `users/${id}`), {
        id,
        username,
        email,
        avatar: imageUrl,
        lastSeen,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const getUserById = async (userId: string): Promise<User | null> => {
    const dbRef = ref(db);
    return get(child(dbRef, `users/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        }
        return null;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  };

  const updateLastSeen = async (userId: string) => {
    try {
      await set(
        ref(db, `users/${userId}/lastSeen`),
        Timestamp.fromDate(new Date())
      );
    } catch (e) {
      console.error(e);
    }
  };

  return { createUser, getUserById, updateLastSeen };
};
