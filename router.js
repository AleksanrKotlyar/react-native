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
	);
};
