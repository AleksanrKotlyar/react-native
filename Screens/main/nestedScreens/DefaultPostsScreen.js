import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	FlatList,
	Button,
	Text,
	Image,
	TouchableOpacity,
} from "react-native";
import { EvilIcons, Feather } from "@expo/vector-icons";

export default function DefaultPostsScreen({ route, navigation }) {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		if (route.params) {
			setPosts((prevState) => [...prevState, route.params]);
		}
	}, [route.params]);

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.innerCont}
				onPress={() => navigation.navigate("Profile")}
			>
				<View style={styles.profileBox}>
					<Feather name="user" size={44} color="black" />
				</View>

				<View style={styles.profileDescrBox}>
					<Text style={styles.profileDescr}>UserLogin</Text>
					<Text style={styles.profileDescr}>UserEmail</Text>
				</View>
			</TouchableOpacity>

			<FlatList
				data={posts}
				style={styles.list}
				keyExtractor={(item, indx) => indx.toString()}
				renderItem={({ item }) => (
					<View>
						<Image source={{ uri: item.photo }} style={styles.poster} />
						<Text style={styles.postTitle}>{item.postDescr}</Text>

						<View style={styles.postDescription}>
							<EvilIcons
								name="comment"
								size={24}
								color="gray"
								style={styles.commentIcon}
								onPress={() => navigation.navigate("Comments", {})}
							/>

							<TouchableOpacity
								style={styles.locationContainer}
								onPress={() =>
									navigation.navigate("Map", {
										locatPos: item.locatPos,
										postDescr: item.postDescr,
									})
								}
							>
								<EvilIcons name="location" size={24} color="gray" />
								<Text>
									{`${item.locatPos.region}, ${item.locatPos.country}`}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
			/>
		</View>
		// <View style={styles.container}>
		// 	<FlatList
		// 		data={posts}
		// 		keyExtractor={(item, indx) => indx.toString()}
		// 		renderItem={({ item }) => (
		// 			<View
		// 				style={{
		// 					marginBottom: 10,
		// 					justifyContent: "center",
		// 					alignItems: "center",
		// 				}}
		// 			>
		// 				<Image
		// 					source={{ uri: item.photo }}
		// 					style={{ width: 350, height: 200 }}
		// 				/>
		// 			</View>
		// 		)}
		// 	/>
		// 	<Button
		// 		title="go to map"
		// 		onPress={() => navigation.navigate("Map", posts)}
		// 	/>
		// 	<Button
		// 		title="go to Comments"
		// 		onPress={() => navigation.navigate("Comments")}
		// 	/>
		// </View>
	);
}

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		justifyContent: "center",
// 		borderTopWidth: 1,
// 		borderTopColor: "rgba(33, 33, 33, 0.3)",
// 	},
// });

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//justifyContent: "center",
		alignItems: "center",
	},
	poster: {
		width: 343,
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

	commentIcon: {
		marginRight: "auto",
		marginVertical: 12,
	},

	locationContainer: {
		flex: 1,
		flexDirection: "row",
		marginLeft: "auto",
		borderBottom: 1,

		justifyContent: "flex-end",
	},

	profileBox: {
		width: 60,
		height: 60,
		backgroundColor: "#F6F6F6",
		borderRadius: 16,
	},
	profileDescrBox: {
		flex: 1,
	},
	profileDescr: {
		fontSize: 16,
		weight: "bold",
	},
	innerCont: {
		flex: 2,
		position: "absolute",
		minHeight: 100,
		flexDirection: "row",
		padding: 20,
	},
	list: {
		marginTop: 60,
	},
});
