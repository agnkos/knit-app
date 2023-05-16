import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";


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


// type Project = {
//     name: string,
// }

// type User = {
//     username: string,
//     userid: string,
//     projects: Project[],
// }

export async function getProjects() {
    const q = query(collection(db, "user"), where("userId", "==", `${auth?.currentUser?.uid}`));
    const querySnapshot = await getDocs(q);
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    console.log(dataArr)

    return dataArr;
}