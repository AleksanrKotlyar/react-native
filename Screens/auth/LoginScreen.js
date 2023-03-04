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
} from "react-native";

const focusState = {
	email: null,
	password: null,
};

export default function LoginScreen({ navigation }) {
	const [isShowKeyboard, setIsShowKeyboard] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [pswdVisible, setPswdVisible] = useState(true);
	const [isOnFocus, setOnFocus] = useState(focusState);
	const [dimWidth, setDimWidth] = useState(Dimensions.get("window").width);
	const [dimHeight, setDimHeight] = useState(Dimensions.get("window").height);

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

	const keyboardHide = () => {
		setIsShowKeyboard(false);
		Keyboard.dismiss();
		console.log(email, password);
		setPassword(""), setFocus(focusState);
	};
	const pswdVisToggle = () => {
		setPswdVisible(!pswdVisible);
	};

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
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
							marginBottom: Platform.OS == "ios" && isShowKeyboard ? 230 : 0,
							width: dimWidth,
						}}
						position={"relative"}
					>
						<View style={styles.header}>
							<Text style={styles.headerTitle}>Войти</Text>
						</View>
						<KeyboardAvoidingView
							behavior={Platform.OS == "ios" ? "padding" : "height"}
						>
							<View style={{ marginTop: 16 }}>
								<TextInput
									style={{
										...styles.input,
										borderColor: isOnFocus.email ? "#FF6C00" : "#E8E8E8",
									}}
									placeholder="Адрес электронной почты"
									inputMode="email"
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
									placeholder="Пароль"
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
											{pswdVisible ? "Показать" : "Скрыть"}
										</Text>
									</TouchableOpacity>
								)}
							</View>

							<TouchableOpacity
								activeOpacity={0.8}
								style={styles.btn}
								onPress={() => {
									navigation.navigate("Home");
									keyboardHide;
								}}
							>
								<Text style={styles.btnTitle}>Войти</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={{
									marginTop: 16,
									marginBottom: dimWidth > dimHeight ? 10 : 144,
								}}
								activeOpacity={0.5}
								onPress={() => navigation.navigate("Registration")}
							>
								<Text style={styles.registerText}>
									Нет аккаунта? Зарегистрироваться
								</Text>
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
	input: {
		borderWidth: 1,

		height: 50,
		borderRadius: 6,
		paddingHorizontal: 16,
		fontSize: 16,
		lineHeight: 19,
		color: "#212121",
		fontFamily: "Roboto-Regular",
	},
	form: {
		maxHeight: 490,
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
		marginTop: 32,
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
});
