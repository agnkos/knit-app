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

// setPersistence(auth, browserLocalPersistence); 

export async function getProjects() {
    let userId: string = auth?.currentUser?.uid || JSON.parse(localStorage.getItem('loggedUser') || '{}');
    console.log('userid:', userId)

    const q = collection(db, "users", `${userId}`, "projects");
    console.log(q)
    const querySnapshot = await getDocs(q);
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }));

    console.log(dataArr)
    console.log('user', auth?.currentUser?.uid)
    return dataArr;
}

export async function getProjectDetail(id: string) {
    let userId: string = auth?.currentUser?.uid || JSON.parse(localStorage.getItem('loggedUser') || '{}')
    const q = doc(db, "users", `${userId}`, "projects", id);
    const projectSnapshot = await getDoc(q);
    // console.log(projectSnapshot.data())
    return projectSnapshot.data()
}

export async function getQueuedItems() {
    let userId: string = auth?.currentUser?.uid || JSON.parse(localStorage.getItem('loggedUser') || '{}');
    const q = collection(db, "users", `${userId}`, "queue");
    // console.log(q)
    const querySnapshot = await getDocs(q);
    const dataArr = querySnapshot.docs.map((doc, i) => ({
        ...doc.data(),
        // id: doc.id
    }));
    // const dataArrSorted = dataArr.sort((a, b) => a.createdAt - b.createdAt).map((item, i) => ({ ...item, position: i + 1 })).sort((a, b) => a.position - b.position)
    const dataArrSorted = dataArr.sort((a, b) => a.position - b.position)
    console.log(dataArrSorted)
    // console.log(dataArr)
    return dataArrSorted;

}
