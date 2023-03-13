// import db from "../../firebase/config";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/config";
import { uploadData } from "../../firebase/uploadStorage";
import { authSlice } from "./authReducer";

const { updateUserProfile, authStateChange, authSignOut, changeAvatarPhoto } =
	authSlice.actions;

export const authSignUpUser =
	({ email, password, login, photo }) =>
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

			const avaURL = await uploadData(photo, user.uid);

			await updateProfile(user, { displayName: login, photoURL: avaURL });
			const { uid, displayName, photoURL } = await auth.currentUser;
			console.log("displayNameREGISTER-------->", displayName);

			dispatch(
				updateUserProfile({
					nickName: displayName,
					userId: uid,
					email,
					avatarURL: photoURL,
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

			const { uid, displayName, photoURL } = user;
			console.log("displayNameLOGIN-------->", displayName);

			dispatch(
				updateUserProfile({
					userId: uid,
					nickName: displayName,
					email,
					avatarURL: photoURL,
				})
			);
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
		console.log("uSER -------->", user);
		if (user) {
			const userUpdateProfile = {
				nickName: user.displayName,
				userId: user.uid,
				email: user.email,
				avatarURL: user.photoURL,
			};
			dispatch(updateUserProfile(userUpdateProfile));
			dispatch(authStateChange({ stateChange: true }));
		}
	});
};

export const changeAvatarPhotoURL =
	(photoUri) => async (dispatch, getState) => {
		try {
			const user = auth.currentUser;
			const avaURL = photoUri ? await uploadData(photoUri, user.uid) : null;
			await updateProfile(user, { photoURL: avaURL });
			await dispatch(changeAvatarPhoto({ avatarURL: avaURL }));
		} catch (error) {
			console.log(error);
		}
	};
