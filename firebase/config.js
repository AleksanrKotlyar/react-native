// import firebase from "firebase/compat/app";
// import "firebase/compat/firestore";
// import "firebase/compat/auth";
// import "firebase/compat/storage";

// const firebaseConfig = {
// 	apiKey: "AIzaSyC1SNVyhbLdSYMtPsLVFnkJNC6oYyd2KSE",
// 	authDomain: "rn-project-c8978.firebaseapp.com",
// 	projectId: "rn-project-c8978",
// 	storageBucket: "gs://rn-project-c8978.appspot.com",
// 	messagingSenderId: "505140792113",
// 	appId: "1:505140792113:web:7a9b8b1fba5f762835be10",
// 	measurementId: "G-Y5Y12B0YVD",
// };

// export default firebase.initializeApp(firebaseConfig);
//-------------------------------------------------------
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyC1SNVyhbLdSYMtPsLVFnkJNC6oYyd2KSE",
	authDomain: "rn-project-c8978.firebaseapp.com",
	projectId: "rn-project-c8978",
	storageBucket: "rn-project-c8978.appspot.com",
	messagingSenderId: "505140792113",
	appId: "1:505140792113:web:7a9b8b1fba5f762835be10",
	measurementId: "G-Y5Y12B0YVD",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

export default app;
