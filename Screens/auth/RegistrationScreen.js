import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	TextInput,
	TouchableOpacity,
	Platform,
	KeyboardAvoidingView,
	Keyboard,
	TouchableWithoutFeedback,
	Dimensions,
	useWindowDimensions,
	Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignUpUser } from "../../redux/auth/authOperations";
import { Camera } from "expo-camera";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const focusState = {
	login: false,
	email: false,
	password: false,
};

export default function RegistrationScreen({ navigation }) {
	const { width, height } = useWindowDimensions();

	const dispatch = useDispatch();

	const [isShowKeyboard, setIsShowKeyboard] = useState(false);
	const [login, setLogin] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [camera, setCamera] = useState(null);
	const [photo, setPhoto] = useState(null);
	const [isShowCamera, setIsShowCamera] = useState(false);
	const [pswdVisible, setPswdVisible] = useState(true);
	const [isOnFocus, setOnFocus] = useState(focusState);
	const [dimWidth, setDimWidth] = useState(Dimensions.get("window").width);
	const [dimHeight, setDimHeight] = useState(Dimensions.get("window").height);

	const [permission, requestPermission] = Camera.useCameraPermissions();
	useEffect(() => {
		const onChange = () => {
			const width = Dimensions.get("window").width;
			const height = Dimensions.get("window").height;

			setDimWidth(width);
			setDimHeight(height);
		};
		Dimensions.addEventListener("change", onChange);
		return () => {
			Dimensions.removeEventListener("change", onChange);
		};
	}, []);

	const handleSubmit = () => {
		setIsShowKeyboard(false);
		Keyboard.dismiss();

		dispatch(authSignUpUser({ login, email, password, photo }));
		setLogin(""), setPassword(""), setEmail("");
		setOnFocus(focusState);
	};

	const pswdVisToggle = () => {
		setPswdVisible(!pswdVisible);
	};

	if (!permission?.granted) {
		requestPermission();
	}
	const takeAvatarPhoto = async () => {
		const photoSnap = await camera.takePictureAsync();
		setPhoto(photoSnap.uri);
	};

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss;
				setIsShowKeyboard(false);
			}}
		>
			<View style={styles.container}>
				<ImageBackground
					style={styles.image}
					source={require("../../assets/images/PhotoBG.jpg")}
				>
					<View
						style={{
							...styles.form,
							marginBottom: Platform.OS == "ios" && isShowKeyboard ? 165 : 0,
							width: dimWidth,
						}}
						position={"relative"}
					>
						<View
							style={{
								...styles.imgAvatar,
								marginHorizontal: (width - 120) / 2,
								flexShrink: 1,
							}}
							position={"absolute"}
						>
							{isShowCamera ? (
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
							) : (
								<Image
									style={{ width: "100%", height: "100%", borderRadius: 16 }}
									source={{ uri: photo }}
								/>
							)}

							{!isShowCamera && photo === null && (
								<TouchableOpacity
									onPress={() => setIsShowCamera(true)}
									style={styles.addImgAvatar}
								>
									<AntDesign name="pluscircleo" size={24} color="#FF6C00" />
								</TouchableOpacity>
							)}
							{photo && (
								<TouchableOpacity
									onPress={() => setPhoto(null)}
									style={styles.addImgAvatar}
								>
									<AntDesign name="closecircleo" size={24} color="#e8e8e8" />
								</TouchableOpacity>
							)}
						</View>
						<View style={styles.header}>
							<Text style={styles.headerTitle}>??????????????????????</Text>
						</View>
						<KeyboardAvoidingView
							behavior={Platform.OS == "ios" ? "padding" : "height"}
						>
							<View>
								<TextInput
									style={{
										...styles.input,
										borderColor: isOnFocus.login ? "#FF6C00" : "#E8E8E8",
									}}
									placeholder="??????????"
									placeholderTextColor="#BDBDBD"
									onFocus={() => {
										setIsShowKeyboard(true);
										setOnFocus({ login: true });
									}}
									onBlur={() => setOnFocus({ login: false })}
									value={login}
									onChangeText={setLogin}
								/>
							</View>

							<View style={{ marginTop: 16 }}>
								<TextInput
									style={{
										...styles.input,
										borderColor: isOnFocus.email ? "#FF6C00" : "#E8E8E8",
									}}
									placeholder="?????????? ?????????????????????? ??????????"
									inputMode="email"
									keyboardType="email-address"
									placeholderTextColor="#BDBDBD"
									onFocus={() => {
										setIsShowKeyboard(true);
										setOnFocus({ email: true });
									}}
									onBlur={() => setOnFocus({ email: false })}
									value={email}
									onChangeText={setEmail}
								/>
							</View>

							<View style={{ marginTop: 16 }}>
								<TextInput
									style={{
										...styles.input,
										position: "relative",
										borderColor: isOnFocus.password ? "#FF6C00" : "#E8E8E8",
									}}
									placeholder="????????????"
									placeholderTextColor="#BDBDBD"
									secureTextEntry={pswdVisible}
									onFocus={() => {
										setIsShowKeyboard(true);
										setOnFocus({ password: true });
									}}
									onBlur={() => setOnFocus({ password: false })}
									value={password}
									onChangeText={setPassword}
								/>
								{password && (
									<TouchableOpacity
										activeOpacity={0.8}
										style={{ position: "absolute", top: 16, right: 16 }}
										onPress={pswdVisToggle}
									>
										<Text style={styles.passwdVisBtn}>
											{pswdVisible ? "????????????????" : "????????????"}
										</Text>
									</TouchableOpacity>
								)}
							</View>

							<TouchableOpacity
								activeOpacity={0.8}
								style={styles.btn}
								onPress={handleSubmit}
							>
								<Text style={styles.btnTitle}>????????????????????????????????????</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={{
									marginTop: 16,
									marginBottom: dimWidth > dimHeight ? 10 : 78,
								}}
								activeOpacity={0.5}
								onPress={() => navigation.navigate("Login")}
							>
								<Text style={styles.registerText}>?????? ???????? ??????????????? ??????????</Text>
							</TouchableOpacity>
						</KeyboardAvoidingView>
					</View>
				</ImageBackground>
			</View>
		</TouchableWithoutFeedback>
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
	input: {
		borderWidth: 1,
		height: 50,
		borderRadius: 6,
		paddingHorizontal: 16,
		fontSize: 16,
		color: "#212121",
		fontFamily: "Roboto-Regular",
		lineHeight: 19,
	},
	form: {
		maxHeight: 549,
		backgroundColor: "#fff",
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		paddingHorizontal: 16,
	},
	btn: {
		borderRadius: 100,
		borderWidth: 1,
		height: 51,
		marginTop: 43,
		justifyContent: "center",
		alignItems: "center",

		...Platform.select({
			ios: {
				backgroundColor: "#fff",
				borderColor: "#FF6C00",
			},
			android: {
				backgroundColor: "#FF6C00",
				borderColor: "#fff",
			},
		}),
	},
	btnTitle: {
		color: Platform.OS === "ios" ? "#FF6C00" : "#fff",
		fontSize: 18,
		fontFamily: "Roboto-Regular",
	},
	header: {
		alignItems: "center",
		marginBottom: 32,
	},
	headerTitle: {
		fontSize: 30,
		color: "#212121",
		fontFamily: "Roboto-Medium",
		marginTop: 92,
	},
	passwdVisBtn: {
		color: "#1B4371",
		fontSize: 16,
		fontFamily: "Roboto-Regular",
	},
	registerText: {
		fontSize: 16,
		fontFamily: "Roboto-Regular",
		color: "#1B4371",
		textAlign: "center",
	},
	camera: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 16,
	},
});
