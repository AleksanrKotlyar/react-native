import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";
import { Text } from "react-native";

export default function PostsScreen({ navigation, route }) {
	const PostsStack = createStackNavigator();
	return <Text>Список публикаций </Text>;
}

// borderTopWidth: 1,
// 		borderTopColor: "rgba(33, 33, 33, 0.3)",
