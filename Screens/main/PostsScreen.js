import { createStackNavigator } from "@react-navigation/stack";
import { Entypo, AntDesign } from "@expo/vector-icons";

import DefaultPostsScreen from "./nestedScreens/DefaultPostsScreen";
import CommentsScreen from "./nestedScreens/CommentsScreen";
import MapScreen from "./nestedScreens/MapScreen";

const PostsStack = createStackNavigator();

export default function PostsScreen({ navigation, route }) {
	return (
		<PostsStack.Navigator
			initialRouteName="DefaultPosts"
			screenOptions={{
				headerTitleAlign: "center",
				headerLeftContainerStyle: {
					paddingLeft: 16,
				},
				headerRightContainerStyle: {
					paddingRight: 16,
				},
			}}
		>
			<PostsStack.Screen
				name="DefaultPosts"
				component={DefaultPostsScreen}
				options={{
					headerShown: true,
					title: "Публикации",
					headerTitleAlign: "center",

					headerTitleStyle: {
						fontFamily: "Roboto-Bold",
						fontSize: 17,
						lineHeight: 22,
					},
					headerRight: () => (
						<Entypo name="log-out" size={24} color="#BDBDBD" />
					),
					// title: "Публикации",
					// headerRight: () => (
					// 	<Entypo
					// 		onPress={() => dispatch(authSignOut())}
					// 		name="log-out"
					// 		size={24}
					// 		color="#BDBDBD"
					// 	/>
					// ),
				}}
			/>
			<PostsStack.Screen
				name="Comments"
				component={CommentsScreen}
				// options={{
				// 	title: "Комментарии",
				// 	headerLeft: () => (
				// 		<AntDesign
				// 			onPress={() => navigation.navigate("DefaultPosts")}
				// 			name="arrowleft"
				// 			size={24}
				// 			color="black"
				// 		/>
				// 	),
				// }}
			/>
			<PostsStack.Screen name="Map" component={MapScreen} />
		</PostsStack.Navigator>
	);
}
