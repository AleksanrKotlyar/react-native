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
import { useSelector } from "react-redux";

import { db } from "../../../firebase/config";
import { collection, setDoc, doc, onSnapshot } from "firebase/firestore";

export default function DefaultPostsScreen({ route, navigation }) {
	const [posts, setPosts] = useState([]);

	const { nickName, email, userId } = useSelector((state) => state.auth);

	const getAllPosts = async () => {
		await onSnapshot(collection(db, "posts"), (querySnapshot) => {
			setPosts([]);
			querySnapshot.forEach((doc) =>
				setPosts((prevState) => [...prevState, { ...doc.data(), id: doc.id }])
			);
		});
		// await db
		// 	.firestore()
		// 	.collection("posts")
		// 	.onSnapshot((data) =>
		// 		setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
		// 	);
	};

	useEffect(() => {
		getAllPosts();
	}, []);

	const addLike = async (item) => {
		const currArr = item.likes ? item.likes : [];
		const likesArr = [...currArr, userId];
		setDoc(doc(db, "posts", item.id), { likes: likesArr }, { merge: true });
	};

	const removeLike = async (item) => {
		const likesArr = item.likes.filter((value) => value !== userId);
		setDoc(doc(db, "posts", item.id), { likes: likesArr }, { merge: true });
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.userCont}
				onPress={() => navigation.navigate("Profile")}
			>
				<View style={styles.photoCont}>
					<Feather name="user" size={44} color="black" />
				</View>
				<View>
					<Text>{nickName}</Text>
					<Text>{email}</Text>
				</View>
			</TouchableOpacity>

			{posts.length > 0 && (
				<FlatList
					data={posts}
					style={styles.list}
					keyExtractor={(item, indx) => indx.toString()}
					renderItem={({ item }) => (
						<View>
							<Image source={{ uri: item.downloadURl }} style={styles.poster} />
							<Text style={styles.postTitle}>{item.postDescription}</Text>

							<View style={styles.postDescription}>
								<Feather
									name="message-circle"
									size={24}
									color={item.comments ? "#FF6C00" : "#BDBDBD"}
									style={styles.commentIcon}
									onPress={() =>
										navigation.navigate("Comments", {
											postId: item.id,
											uri: item.downloadURl,
										})
									}
								/>

								<View>
									<Text
										style={{
											color: item.comments ? "black" : "#BDBDBD",
											marginLeft: 6,
											fontSize: 16,
										}}
									>
										{item.comments?.le ? item.comments.length : 0}
									</Text>
								</View>
								<View style={{ marginLeft: 24, flexDirection: "row" }}>
									<Feather
										name="thumbs-up"
										size={18}
										color={
											item.likes?.some((value) => value === userId)
												? "#FF6C00"
												: "#BDBDBD"
										}
										onPress={() => {
											item.likes?.some((value) => value === userId)
												? removeLike(item)
												: addLike(item);
										}}
									/>
									<Text
										style={{
											marginLeft: 6,
											color: item.likes?.length > 0 ? "black" : "#BDBDBD",
											fontSize: 16,
										}}
									>
										{item.likes?.length || 0}
									</Text>
								</View>

								<TouchableOpacity
									style={styles.locationContainer}
									onPress={() => {
										if (Object.keys(item.location).length > 0) {
											navigation.navigate("Map", {
												location: item.location,
												postDescr: item.postDescription,
											});
										}
										return;
									}}
								>
									<EvilIcons name="location" size={24} color="gray" />
									<Text style={{ textDecorationLine: "underline" }}>
										{Object.keys(item.location).length > 0
											? `${item.location.region}, ${item.location.country}`
											: "Местоположение не указано"}
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					)}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderTopWidth: 1,
		borderTopColor: "rgba(33, 33, 33, 0.3)",
		paddingHorizontal: 16,
		paddingTop: 32,
	},
	poster: {
		width: "100%",
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
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
	},

	commentIcon: {
		marginVertical: 12,
	},

	locationContainer: {
		flexDirection: "row",
		marginLeft: "auto",
		borderBottom: 1,

		justifyContent: "flex-end",
	},

	photoCont: {
		backgroundColor: "red",
		width: 60,
		height: 60,
		marginRight: 8,
		borderRadius: 16,
		alignItems: "center",
		justifyContent: "center",
	},
	userCont: {
		flexDirection: "row",
		alignItems: "center",
	},
	list: {
		marginTop: 32,
	},
});
