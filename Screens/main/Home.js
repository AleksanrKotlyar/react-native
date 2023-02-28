import { Text } from "react-native";
import { Feather, AntDesig, Entypo } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProfileScreen from "./ProfileScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import PostsScreen from "./PostsScreen";

const MainTabs = createBottomTabNavigator();

export default function Home({ navigation, route }) {
	// const dispatch = useDispatch();

	return (
		<MainTabs.Navigator
			initialRouteName="Posts"
			screenOptions={{
				headerTitleAlign: "center",
				headerLeftContainerStyle: {
					paddingLeft: 16,
				},
				headerRightContainerStyle: {
					paddingRight: 16,
				},
				tabBarShowLabel: false,
				tabBarStyle: { paddingLeft: 50, paddingRight: 50, height: 83 },
			}}
		>
			<MainTabs.Screen
				options={{
					headerShown: true,
					title: "Публикации",
					headerTitleAlign: "center",

					headerTitleStyle: {
						fontFamily: "Roboto-Bold",
						fontSize: 17,
						lineHeight: 22,
					},
					tabBarIcon: ({ focused, size, color }) => (
						<Feather name="grid" size={24} color={color} />
					),
					headerRight: () => (
						<Entypo name="log-out" size={24} color="#BDBDBD" />
					),
				}}
				name="Posts"
				component={PostsScreen}
			/>
			<MainTabs.Screen
				options={{
					headerShown: true,
					title: "Создать публикации",
					headerTitleAlign: "center",

					headerTitleStyle: {
						fontFamily: "Roboto-Bold",
						fontSize: 17,
					},
					tabBarIcon: ({ focused, size, color }) => (
						<View style={style.btnCont}>
							<Feather name="plus" style={style.addBtnText} />
						</View>
					),
				}}
				name="CreatePosts"
				component={CreatePostsScreen}
			/>
			<MainTabs.Screen
				options={{
					headerShown: false,
					tabBarIcon: ({ focused, size, color }) => (
						<Feather name="user" size={size} color={color} />
					),
				}}
				name="Profile"
				component={ProfileScreen}
			/>
		</MainTabs.Navigator>
	);
}

const style = StyleSheet.create({
	btnCont: {
		alignItems: "center",
		justifyContent: "center",
		width: 70,
		height: 40,
		borderRadius: 20,
		backgroundColor: "#FF6C00",
	},
	addBtnText: {
		fontSize: 25,
		color: "#ffffff",
		fontWeight: "100",
	},
});
