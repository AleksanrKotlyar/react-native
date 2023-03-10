import React, { useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	FlatList,
	Image,
	Text,
	TouchableOpacity,
	ImageBackground,
	Dimensions,
} from "react-native";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import {
	changeAvatarPhotoURL,
	authSignOutUser,
} from "../../redux/auth/authOperations";
import {
	EvilIcons,
	Feather,
	Entypo,
	AntDesign,
	MaterialIcons,
} from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { Camera } from "expo-camera";

// import db from "../firebase/config";

export default function ProfileScreen({ navigation, route }) {
	const width = Dimensions.get("window").width;
	const dispatch = useDispatch();
	const [userPosts, setUserPosts] = useState([]);
	const [camera, setCamera] = useState(null);
	const { userId, nickName, avatarURL } = useSelector((state) => state.auth);

	const [photo, setPhoto] = useState(avatarURL);

	const [isShowCamera, setIsShowCamera] = useState(false);
	const [permission, requestPermission] = Camera.useCameraPermissions();
	useEffect(() => {
		getUserPosts();
	}, []);

	const getUserPosts = async () => {
		const posts = query(collection(db, "posts"), where("userId", "==", userId));
		await onSnapshot(posts, (querySnapshot) => {
			setUserPosts([]);
			querySnapshot.forEach((doc) => {
				setUserPosts((prevState) => [
					...prevState,
					{ ...doc.data(), docId: doc.id },
				]);
			});
		});
		// await db
		// 	.firestore()
		// 	.collection("posts")
		// 	.where("userId", "==", userId)
		// 	.onSnapshot((data) =>
		// 		setUserPosts(data.docs.map((doc) => ({ ...doc.data() })))
		// 	);
	};

	if (!permission?.granted) {
		requestPermission();
	}
	const takeAvatarPhoto = async () => {
		const photoSnap = await camera.takePictureAsync();
		setPhoto(photoSnap.uri);
		dispatch(changeAvatarPhotoURL(photoSnap.uri));
		setIsShowCamera(false);
	};

	const changeAvatPhotoHandle = (photo) => {
		dispatch(changeAvatarPhotoURL(photo));
	};

	return (
		<View style={styles.container}>
			<ImageBackground
				style={styles.image}
				source={require("../../assets/images/PhotoBG.jpg")}
			>
				<View style={styles.form} position={"relative"}>
					<View
						style={{
							...styles.imgAvatar,
							marginHorizontal: (width - 120) / 2,
						}}
						position={"absolute"}
					>
						{/* {avatarURL && (
							<Image
								style={{ width: "100%", height: "100%", borderRadius: 16 }}
								source={{ uri: avatarURL }}
							/>
						)}
						<Image
							style={styles.addImgAvatar}
							source={require("../../assets/icons/add.png")}
						/> */}
						{isShowCamera && (
							<Camera
								style={styles.camera}
								ref={setCamera}
								type={Camera.Constants.Type.front}
							>
								<TouchableOpacity
									onPress={async () => {
										await takeAvatarPhoto();
										await setIsShowCamera(false);
									}}
									style={styles.btnCont}
								>
									<MaterialIcons
										name="photo-camera"
										size={24}
										color="#BDBDBD"
									/>
								</TouchableOpacity>
							</Camera>
						)}

						{avatarURL && (
							<Image
								style={{ width: "100%", height: "100%", borderRadius: 16 }}
								source={{ uri: avatarURL }}
							/>
						)}

						{!isShowCamera && avatarURL === null && (
							<TouchableOpacity
								onPress={() => setIsShowCamera(true)}
								style={styles.addImgAvatar}
							>
								<AntDesign name="pluscircleo" size={24} color="#FF6C00" />
							</TouchableOpacity>
						)}
						{avatarURL && (
							<TouchableOpacity
								onPress={() => changeAvatPhotoHandle(null)}
								style={styles.addImgAvatar}
							>
								<AntDesign name="closecircleo" size={24} color="#e8e8e8" />
							</TouchableOpacity>
						)}
					</View>

					<Entypo
						name="log-out"
						style={{
							position: "absolute",
							top: 22,
							right: 16,
						}}
						size={24}
						color="#BDBDBD"
						onPress={() => dispatch(authSignOutUser())}
					/>
					<View
						style={{
							marginTop: 92,
							alignSelf: "center",
						}}
					>
						<Text style={styles.profileName}>{nickName}</Text>
					</View>
					<View>
						<FlatList
							data={userPosts}
							style={styles.list}
							keyExtractor={(item, indx) => indx.toString()}
							renderItem={({ item }) => (
								<View>
									<Image
										source={{ uri: item.downloadURl }}
										style={styles.poster}
									/>
									<Text style={styles.postTitle}>{item.postDescription}</Text>

									<View style={styles.postDescription}>
										<Feather
											name="message-circle"
											size={24}
											color={item.comments ? "#FF6C00" : "#BDBDBD"}
											style={styles.commentIcon}
											onPress={() =>
												navigation.navigate("Comments", {
													postId: item.id,
													uri: item.downloadURl,
												})
											}
										/>
										<View>
											<Text
												style={{
													color: item.comments ? "black" : "#BDBDBD",
													marginLeft: 6,
													fontSize: 16,
												}}
											>
												{item.comments ? item.comments.length : 0}
											</Text>
										</View>
										<View style={{ marginLeft: 24, flexDirection: "row" }}>
											<Feather
												name="thumbs-up"
												size={18}
												color={item.likes?.length > 0 ? "#FF6C00" : "#BDBDBD"}
											/>
											<Text
												style={{
													marginLeft: 6,
													color: item.likes?.length > 0 ? "black" : "#BDBDBD",
													fontSize: 16,
												}}
											>
												{item.likes?.length || 0}
											</Text>
										</View>
										<TouchableOpacity
											style={styles.locationContainer}
											onPress={() => {
												if (Object.keys(item.location).length > 0) {
													navigation.navigate("Map", {
														location: item.location,
													});
												}
												return;
											}}
										>
											<EvilIcons name="location" size={24} color="gray" />
											<Text style={{ textDecorationLine: "underline" }}>
												{Object.keys(item.location).length > 0
													? `${item.location.country}`
													: "???????????????????????????? ???? ??????????????"}
											</Text>
										</TouchableOpacity>
									</View>
								</View>
							)}
						/>
					</View>
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	image: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "flex-end",
	},
	imgAvatar: {
		height: 120,
		width: 120,
		backgroundColor: "#F6F6F6",
		top: "-11%",
		borderRadius: 16,
	},
	addImgAvatar: {
		height: 25,
		width: 25,
		position: "absolute",
		top: 81,
		left: 107,
	},

	profileName: {
		fontFamily: "Roboto-Bold",
		fontSize: 30,
		color: "#212121",
	},
	form: {
		minHeight: "80%",
		backgroundColor: "#fff",
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		paddingHorizontal: 16,
	},
	innerCont: {
		flex: 2,
		position: "absolute",
		minHeight: 100,
		flexDirection: "row",
		padding: 20,
	},
	profileBox: {
		width: 60,
		height: 60,
		backgroundColor: "#F6F6F6",
		borderRadius: 16,
	},
	list: {
		marginTop: 32,
	},
	poster: {
		width: "100%",
		height: 240,
		borderRadius: 8,
		marginTop: 16,
	},
	postTitle: {
		marginRight: "auto",
		fontSize: 16,
		weight: "bold",
	},

	postDescription: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},
	locationContainer: {
		flex: 1,
		flexDirection: "row",
		marginLeft: "auto",
		borderBottom: 1,

		justifyContent: "flex-end",
	},
	camera: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 16,
	},
});
