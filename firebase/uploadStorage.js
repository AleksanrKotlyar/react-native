import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

export const uploadData = async (file, id) => {
	const response = await fetch(file);
	const blob = await response.blob();
	const photoRef = ref(storage, `posts/${id}/${Date.now()}.jpg`);
	await uploadBytes(photoRef, blob);
	const downloadURL = await getDownloadURL(photoRef);
	return downloadURL;
};
