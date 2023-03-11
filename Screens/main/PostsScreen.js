import { createStackNavigator } from "@react-navigation/stack";
import { Entypo, AntDesign } from "@expo/vector-icons";

import DefaultPostsScreen from "./nestedScreens/DefaultPostsScreen";
import CommentsScreen from "./nestedScreens/CommentsScreen";
import MapScreen from "./nestedScreens/MapScreen";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";

const PostsStack = createStackNavigator();

export default function PostsScreen({ navigation, route }) {
	const dispatch = useDispatch();

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

					headerRight: ({ focused, size, color }) => (
						<Entypo
							name="log-out"
							size={24}
							color={focused ? "#FF6C00" : "#BDBDBD"}
							onPress={() => dispatch(authSignOutUser())}
						/>
					),
				}}
			/>
			<PostsStack.Screen
				name="Comments"
				component={CommentsScreen}
				options={{
					title: "Комментарии",
				}}
			/>
			<PostsStack.Screen name="Map" component={MapScreen} />
		</PostsStack.Navigator>
	);
}
