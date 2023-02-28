import { createStackNavigator } from "@react-navigation/stack";
import { RegistrationScreen, LoginScreen } from "./Screens/auth";

import { Home } from "./Screens/main";

const AuthStack = createStackNavigator();

export default useRout = (isAuth) => {
	if (!isAuth) {
		return (
			<AuthStack.Navigator initialRouteName="Login">
				<AuthStack.Screen
					options={{ headerShown: false }}
					name="Registration"
					component={RegistrationScreen}
				/>
				<AuthStack.Screen
					options={{ headerShown: false }}
					name="Login"
					component={LoginScreen}
				/>
			</AuthStack.Navigator>
		);
	}
	return (
		<AuthStack.Navigator initialRouteName="Home">
			<AuthStack.Screen
				options={{ headerShown: false }}
				name="Home"
				component={Home}
			/>
		</AuthStack.Navigator>

		// <MainTabs.Navigator
		// 	initialRouteName="Home"
		// 	screenOptions={{
		// 		headerTitleAlign: "center",
		// 		headerLeftContainerStyle: {
		// 			paddingLeft: 16,
		// 		},
		// 		headerRightContainerStyle: {
		// 			paddingRight: 16,
		// 		},
		// 		tabBarShowLabel: false,
		// 		tabBarStyle: { paddingLeft: 50, paddingRight: 50, height: 83 },
		// 	}}
		// >
		// 	<MainTabs.Screen
		// 		options={{
		// 			headerShown: true,
		// 			title: "Публикации",
		// 			headerTitleAlign: "center",

		// 			headerTitleStyle: {
		// 				fontFamily: "Roboto-Bold",
		// 				fontSize: 17,
		// 			},
		// 			tabBarIcon: () => <Feather name="grid" size={24} color={"#BDBDBD"} />,
		// 		}}
		// 		name="Posts"
		// 		component={PostsScreen}
		// 	/>
		// 	<MainTabs.Screen
		// 		options={{
		// 			headerShown: true,
		// 			title: "Создать публикации",
		// 			headerTitleAlign: "center",

		// 			headerTitleStyle: {
		// 				fontFamily: "Roboto-Bold",
		// 				fontSize: 17,
		// 			},
		// 			tabBarIcon: () => (
		// 				<View style={style.btnCont}>
		// 					<Feather name="plus" style={style.addBtnText} />
		// 				</View>
		// 			),
		// 		}}
		// 		name="CreatePosts"
		// 		component={CreatePostsScreen}
		// 	/>
		// 	<MainTabs.Screen
		// 		options={{
		// 			headerShown: false,
		// 			tabBarIcon: ({ focused, size, color }) => (
		// 				<Feather name="user" size={size} color={color} />
		// 			),
		// 		}}
		// 		name="Profile"
		// 		component={ProfileScreen}
		// 	/>
		// </MainTabs.Navigator>
	);
};

// const style = StyleSheet.create({
// 	btnCont: {
// 		alignItems: "center",
// 		justifyContent: "center",
// 		width: 70,
// 		height: 40,
// 		borderRadius: 20,
// 		backgroundColor: "#FF6C00",
// 	},
// 	addBtnText: {
// 		fontSize: 25,
// 		color: "#ffffff",
// 		fontWeight: "100",
// 	},
// });
