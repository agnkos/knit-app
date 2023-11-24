import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, collection, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCBXa8wPg2Mjig2yDbna6K2ikWYG9y3XTQ",
    authDomain: "knit-app-a284a.firebaseapp.com",
    databaseURL: "https://knit-app-a284a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "knit-app-a284a",
    storageBucket: "knit-app-a284a.appspot.com",
    messagingSenderId: "447325401039",
    appId: "1:447325401039:web:cd31bb3c710a2a6d19acba"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const usersRef = collection(db, "users");
export const storage = getStorage(app);

export async function getProjects() {
    const userId: string = auth?.currentUser?.uid || JSON.parse(localStorage.getItem('loggedUser') || '{}');
    const q = collection(db, "users", `${userId}`, "projects");
    const querySnapshot = await getDocs(q);
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));
    return dataArr;
}

export async function getProjectDetail(id: string) {
    const userId: string = auth?.currentUser?.uid || JSON.parse(localStorage.getItem('loggedUser') || '{}')
    const q = doc(db, "users", `${userId}`, "projects", id);
    const projectSnapshot = await getDoc(q);
    return projectSnapshot.data()
}

export async function getQueuedItems() {
    const userId: string = auth?.currentUser?.uid || JSON.parse(localStorage.getItem('loggedUser') || '{}');
    const q = collection(db, "users", `${userId}`, "queue");
    const querySnapshot = await getDocs(q);
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
    }));
    const dataArrSorted = dataArr.sort((a, b) => a.position - b.position)
    return dataArrSorted;
}

export async function getStash() {
    const userId: string = auth?.currentUser?.uid || JSON.parse(localStorage.getItem('loggedUser') || '{}');
    const q = collection(db, "users", `${userId}`, "stash");
    const querySnapshot = await getDocs(q);
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));
    return dataArr;
}

export async function getStashItem(id: string) {
    const userId: string = auth?.currentUser?.uid || JSON.parse(localStorage.getItem('loggedUser') || '{}')
    const q = doc(db, "users", `${userId}`, "stash", id);
    const stashItemSnapshot = await getDoc(q);
    return stashItemSnapshot.data()
}

export async function getNotes() {
    const userId: string = auth?.currentUser?.uid || JSON.parse(localStorage.getItem('loggedUser') || '{}');
    const q = collection(db, "users", `${userId}`, "notes");
    const querySnapshot = await getDocs(q);
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));
    return dataArr;
}