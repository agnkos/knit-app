import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, collection, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";


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

export async function getProjects() {
    const q = collection(db, "users", `${auth?.currentUser?.uid}`, "projects")
    const querySnapshot = await getDocs(q);
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    // console.log(dataArr)
    return dataArr;
}

export async function getProjectDetail(id: string) {
    const q = doc(db, "users", `${auth?.currentUser?.uid}`,"projects", id);
    const projectSnapshot = await getDoc(q);
    // console.log(projectSnapshot.data())
    return projectSnapshot.data()
}
