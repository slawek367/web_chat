import { getDatabase, ref, set } from 'firebase/database';
import { firebaseApp } from './firebaseConf';

export const db = getDatabase(firebaseApp);
