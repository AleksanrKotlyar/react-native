import {
	Text,
	Image,
	View,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	Platform,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { MaterialIcons, Feather, Octicons } from "@expo/vector-icons";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../../firebase/config";
// import db  from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function CreatePostsScreen({ navigation }) {
	const [permission, requestPermission] = Camera.useCameraPermissions();

	const [errorMsg, setErrorMsg] = useState(null);
	const [locatPos, setLocatPos] = useState({});
	const [camera, setCamera] = useState(null);
	const [photo, setPhoto] = useState(null);
	// const [hasPermission, setHasPermission] = useState(null);
	const [postDescr, setPostDescr] = useState("");
	const isReadyToPubl = postDescr && photo;
	const [isShowCamera, setIsShowCamera] = useState(true);
	const { userId, nickName } = useSelector((state) => state.auth);

	useEffect(() => {
		// (async () => {
		// 		const { status } = await Camera.requestPermissionsAsync();
		// 		console.log(status);
		// 		await MediaLibrary.requestPermissionsAsync();

		// 		setHasPermission(status === "granted");
		// 	})();

		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}
			let { coords } = await Location.getCurrentPositionAsync();
			let place = await Location.reverseGeocodeAsync({
				latitude: coords.latitude,
				longitude: coords.longitude,
			});

			let positionData = {
				latitude: coords.latitude,
				longitude: coords.longitude,
				region: place[0].region,
				country: place[0].country,
			};
			setLocatPos(positionData);
		})();
	}, []);

	// if (hasPermission === null) {
	// 	return <View />;
	// }
	// if (hasPermission === false) {
	// 	return <Text>No access to camera</Text>;
	// }

	const takePhoto = async () => {
		const { uri } = await camera.takePictureAsync();
		setPhoto(uri);
		let { coords } = await Location.getCurrentPositionAsync();
		let place = await Location.reverseGeocodeAsync({
			latitude: coords.latitude,
			longitude: coords.longitude,
		});
		console.log("place", place);

		let positionData = {
			latitude: coords.latitude,
			longitude: coords.longitude,
			region: place[0].region,
			country: place[0].country,
		};
		setLocatPos(positionData);
		setIsShowCamera(true);
	};

	const cleanData = () => {
		setPhoto(null);
		setLocatPos({});
		setPostDescr("");
	};

	const onPublishHandle = async () => {
		const downloadURl = await uploadPhotoToServer();

		const docRef = await addDoc(collection(db, "posts"), {
			downloadURl,
			postDescription: postDescr,
			location: locatPos,
			userId,
			nickName,
			likes: [],
		});

		if (isReadyToPubl) {
			navigation.navigate("DefaultPosts");

			cleanData();
		}
	};

	// const uploadPostToServer = async () => {

	// 	const createPost = await db
	// 		.firestore()
	// 		.collection("posts")
	// 		.add({ photo, comment, location: location.coords, userId, nickName });
	// };

	const uploadPhotoToServer = async () => {
		const response = await fetch(photo);
		const file = await response.blob();
		const uniquePostId = Date.now().toString();
		const photoRef = ref(storage, `postImage/${uniquePostId}`);
		await uploadBytes(photoRef, file);
		const downloadURL = await getDownloadURL(photoRef);
		return downloadURL;
		// const response = await fetch(photo);
		// const file = await response.blob();
		// const uniquePostId = Date.now().toString();
		// await db.storage().ref(`postImage/${uniquePostId}`).put(file);

		// const processedPhoto = await db
		// 	.storage()
		// 	.ref("postImage")
		// 	.child(uniquePostId)
		// 	.getDownloadURL();
		// return processedPhoto;
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={style.cont}>
				{isShowCamera ? (
					<View style={style.camera}>
						{photo && <Image style={style.photoImg} source={{ uri: photo }} />}
						<TouchableOpacity
							onPress={() => setIsShowCamera(false)}
							style={{
								...style.btnCont,
								backgroundColor: photo ? "rgba(255, 255, 255, 0.3)" : "#FFF",
							}}
						>
							<MaterialIcons
								name="photo-camera"
								size={24}
								color={photo ? "#FFF" : "#BDBDBD"}
							/>
						</TouchableOpacity>
					</View>
				) : (
					<Camera style={style.camera} ref={setCamera}>
						<TouchableOpacity
							onPress={() => {
								takePhoto();
							}}
							style={style.btnCont}
						>
							<MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
						</TouchableOpacity>
					</Camera>
				)}
				<Text style={style.underCameraText}>
					{photo ? "Редактировать фото" : "Загрузите фото"}
				</Text>
				<KeyboardAvoidingView
					behavior={Platform.OS == "ios" ? "padding" : "height"}
				>
					<TextInput
						style={style.postDescr}
						value={postDescr}
						onChangeText={setPostDescr}
						placeholder="Название..."
						placeholderTextColor="#BDBDBD"
					/>

					<View style={style.locatCont}>
						<Octicons
							name="location"
							size={24}
							color="rgba(189, 189, 189, 1)"
						/>
						<Text
							style={{
								...style.locatText,
								color: locatPos.region ? "#212121" : "#BDBDBD",
							}}
						>
							{locatPos.region && locatPos.country
								? `${locatPos.region}, ${locatPos.country}`
								: "Местность..."}
						</Text>
					</View>
				</KeyboardAvoidingView>
				<TouchableOpacity
					style={{
						...style.publBtn,
						backgroundColor: isReadyToPubl ? "#FF6C00" : "#F6F6F6",
					}}
				>
					<Text
						onPress={onPublishHandle}
						style={{
							...style.publBtnText,
							color: isReadyToPubl ? "#fff" : "#BDBDBD",
						}}
					>
						Опубликовать
					</Text>
				</TouchableOpacity>
				<View style={style.clearBtnCont}>
					<TouchableOpacity
						onPress={cleanData}
						style={{
							...style.clearBtn,
							backgroundColor: isReadyToPubl ? "#FF8c00" : "##BDBDBD",
						}}
					>
						<Feather name="trash-2" size={24} color="#BDBDBD" />
					</TouchableOpacity>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
}

const style = StyleSheet.create({
	cont: {
		flex: 1,
		backgroundColor: "#fff",
		paddingHorizontal: 16,
		paddingTop: 32,
		borderTopWidth: 1,
		borderTopColor: "rgba(33, 33, 33, 0.3)",
	},
	camera: {
		backgroundColor: "#f6f6f6",
		width: "100%",
		height: 240,
		justifyContent: "center",
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderRadius: 8,
		borderColor: "#E8E8E8",
	},
	photoImg: {
		flex: 1,
		width: "100%",
	},
	btnCont: {
		position: "absolute",
		width: 60,
		height: 60,
		backgroundColor: "#fff",
		borderRadius: 30,
		alignItems: "center",
		justifyContent: "center",
	},
	underCameraText: {
		marginTop: 8,
		color: "#BDBDBD",
		fontFamily: "Roboto-Regular",
		fontSize: 16,
	},
	postDescr: {
		borderBottomColor: "#E8E8E8",
		borderBottomWidth: 1,
		color: "#000",
		marginTop: 32,
		fontFamily: "Roboto-Regular",
		fontSize: 16,
		paddingBottom: 15,
	},
	publBtn: {
		justifyContent: "center",
		alignItems: "center",
		height: 51,
		marginTop: 32,
		borderRadius: 100,
	},
	publBtnText: {
		fontFamily: "Roboto-Regular",
		fontSize: 16,
	},
	clearBtn: {
		backgroundColor: "#f6f6f6",
		justifyContent: "center",
		alignItems: "center",
		height: 40,
		width: 70,
		borderRadius: 20,
	},
	clearBtnCont: {
		justifyContent: "flex-end",
		alignItems: "center",
		marginBottom: 32,
		marginTop: 100,
	},
	locatCont: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 32,
		borderBottomWidth: 1,
		borderBottomColor: "#E8E8E8",
		paddingBottom: 15,
	},
	locatText: {
		marginLeft: 8,
		fontFamily: "Roboto-Regular",
		fontSize: 16,
	},
});
