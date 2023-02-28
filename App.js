// import { StatusBar } from "expo-status-bar";
import {} from "react-native";
import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import useRout from "./router";
import { NavigationContainer } from "@react-navigation/native";

const loadFonts = async () => {
	await Font.loadAsync({
		"Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
		"Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
		"Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
	});
};

export default function App() {
	const [isReady, setIsReady] = useState(false);
	const routing = useRout(true);

	if (!isReady) {
		return (
			<AppLoading
				startAsync={loadFonts}
				onFinish={() => setIsReady(true)}
				onError={console.warn}
			/>
		);
	}

	return <NavigationContainer>{routing}</NavigationContainer>;
}
