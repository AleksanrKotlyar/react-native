// import firebase from "firebase/compat/app";
// import { initializeApp } from "firebase/app";
// import "firebase/auth";
// import "firebase/storage";
// import "firebase/firestore";

// const firebaseConfig = {
// 	apiKey: "AIzaSyC1SNVyhbLdSYMtPsLVFnkJNC6oYyd2KSE",
// 	authDomain: "rn-project-c8978.firebaseapp.com",
// 	projectId: "rn-project-c8978",
// 	storageBucket: "rn-project-c8978.appspot.com",
// 	messagingSenderId: "505140792113",
// 	appId: "1:505140792113:web:7a9b8b1fba5f762835be10",
// 	measurementId: "G-Y5Y12B0YVD",
// };

// // export default db = initializeApp(firebaseConfig);

// const app = firebase.initializeApp(firebaseConfig);

// export default app;

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyC1SNVyhbLdSYMtPsLVFnkJNC6oYyd2KSE",
	authDomain: "rn-project-c8978.firebaseapp.com",
	projectId: "rn-project-c8978",
	storageBucket: "rn-project-c8978.appspot.com",
	messagingSenderId: "505140792113",
	appId: "1:505140792113:web:7a9b8b1fba5f762835be10",
	measurementId: "G-Y5Y12B0YVD",
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
