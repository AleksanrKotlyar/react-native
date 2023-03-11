import db from "../../firebase/config";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase/config";

import { authSlice } from "./authReducer";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser =
	({ email, password, login }) =>
	async (dispatch, getState) => {
		// try {
		// 	await db.auth().createUserWithEmailAndPassword(email, password);
		// 	const user = await db.auth().currentUser;
		// 	await user.updateProfile({
		// 		displayName: login,
		// 	});
		// 	const { displayName, uid } = await db.auth().currentUser;
		// 	const userUpdateProfile = {
		// 		nickName: displayName,
		// 		userId: uid,
		// 	};
		// 	dispatch(updateUserProfile(userUpdateProfile));
		// } catch (error) {
		// 	console.log("error.code", error.code);
		// 	console.log("error.message", error.message);
		// }
		try {
			const { user } = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			// const avatarURL = await uploadPhoto(photo, user.uid);
			// console.log("avatarURL: ", avatarURL);

			await updateProfile(user, { displayName: login });
			const { uid, displayName } = await auth.currentUser;

			dispatch(
				updateUserProfile({
					nickName: displayName,
					userId: uid,
					email,
				})
			);
		} catch (error) {
			console.log("Sign up error", error),
				console.log("sign up error.message", error.message);
		}
	};

export const authSignInUser =
	({ email, password }) =>
	async (dispatch, getState) => {
		// try {
		// 	const user = await db.auth().signInWithEmailAndPassword(email, password);
		// 	console.log("user", user);
		// } catch (error) {
		// 	console.log("error.code", error.code);
		// 	console.log("error.message", error.message);
		// }

		try {
			const { user } = await signInWithEmailAndPassword(auth, email, password);

			const { uid, displayName } = user;

			// dispatch(
			// 	updateUserProfile({
			// 		userId: uid,
			// 		name: displayName,
			// 		userEmail: email,
			// 		avatURL: photoURL,
			// 	})
			// );
		} catch (error) {
			console.log("Sign up error", error),
				console.log("sign up error.message", error.message);
		}
	};

export const authSignOutUser = () => async (dispatch, getState) => {
	await signOut(auth);
	dispatch(authSignOut());
	// await db.auth().signOut();
	// dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => {
	// await db.auth().onAuthStateChanged((user) => {
	// 	if (user) {
	// 		const userUpdateProfile = {
	// 			nickName: user.displayName,
	// 			userId: user.uid,
	// 		};
	// 		dispatch(authStateChange({ stateChange: true }));
	// 		dispatch(updateUserProfile(userUpdateProfile));
	// 	}
	// });
	await onAuthStateChanged(auth, (user) => {
		if (user) {
			const userUpdateProfile = {
				nickName: user.displayName,
				userId: user.uid,
				email: user.email,
			};
			dispatch(updateUserProfile(userUpdateProfile));
			dispatch(authStateChange({ stateChange: true }));
		}
	});
};
