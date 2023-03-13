import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Image,
	SafeAreaView,
	FlatList,
	Keyboard,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useSelector } from "react-redux";

export default function CommentsScreen({ navigation, route }) {
	const { postId } = route.params;
	const [comment, setComment] = useState("");
	const [allComments, setAllComments] = useState([]);
	const { nickName, avatarURL } = useSelector((state) => state.auth);
	const { uri } = route.params;
	const [InpBordColor, setInpBordColor] = useState("#E8E8E8");

	useEffect(() => {
		getAllPosts();
	}, []);

	const createPost = async () => {
		if (comment) {
			const date = new Date();
			const commentDate =
				date.toLocaleDateString() + " " + date.toLocaleTimeString();

			const commentValue = {
				text: comment,
				date: commentDate,
				nickName,
				avatarURL,
			};

			await setDoc(
				doc(db, "posts", postId),
				{ comments: [...allComments, commentValue] },
				{ merge: true }
			);
		}
		Keyboard.dismiss;
		setComment("");

		// db.firestore()
		// 	.collection("posts")
		// 	.doc(postId)
		// 	.collection("comments")
		// 	.add({ comment, login });
	};

	const getAllPosts = async () => {
		await onSnapshot(doc(db, "posts", postId), (doc) =>
			setAllComments(doc.data().comments || [])
		);
		// db.firestore()
		// 	.collection("posts")
		// 	.doc(postId)
		// 	.collection("comments")
		// 	.onSnapshot((data) =>
		// 		setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
		// 	);
	};

	return (
		<View style={styles.container}>
			<View>
				<Image source={{ uri }} style={styles.poster} />
			</View>

			<FlatList
				data={allComments}
				keyExtractor={(item, indx) => indx.toString()}
				renderItem={({ item }) => (
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							// alignItems: "center",
							marginTop: 6,
						}}
					>
						<View
							style={{
								flexDirection: "column",
								alignItems: "center",
								maxWidth: 30,
								marginRight: 4,
							}}
						>
							{item.avatarURL && (
								<Image
									style={{
										height: 28,
										width: 28,
										backgroundColor: "grey",
										borderRadius: 14,
									}}
									source={{ uri: item.avatarURL }}
								/>
							)}

							{!item.avatarURL && (
								<Text style={styles.commentAuthor}>{item.nickName}</Text>
							)}
						</View>
						<View style={styles.commentText}>
							<Text
								style={{
									fontSize: 14,
									justifyContent: "flex-end",
									fontFamily: "Roboto-Medium",
								}}
							>
								{item.text}
							</Text>
							<Text
								style={{
									fontSize: 10,
									marginLeft: "auto",
									justifyContent: "flex-end",
									color: "rgba(0, 0, 0, 0.4)",
								}}
							>
								{item.date}
							</Text>
						</View>
					</View>
				)}
			/>

			{/* <View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					onChangeText={setComment}
					value={comment}
				/>
			</View>
			<TouchableOpacity
				onPress={createPost}
				style={styles.sendBtn}
				activeOpacity={0.8}
			>
				<Text style={styles.buttonText}>Comment</Text>
			</TouchableOpacity> */}

			<View style={{ ...styles.InpCont, borderColor: `${InpBordColor}` }}>
				<TextInput
					style={styles.textInput}
					value={comment}
					onChangeText={setComment}
					placeholder="Комментировать..."
					onFocus={() => setInpBordColor("#FF6C00")}
					onBlur={() => setInpBordColor("#E8E8E8")}
				/>
				<TouchableOpacity onPress={createPost} style={styles.InpBtn}>
					<AntDesign name="arrowup" size={14} color="white" />
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
		paddingTop: 32,
	},
	sendBtn: {
		paddingTop: 16,
		paddingBottom: 16,
		paddingLeft: 32,
		paddingRight: 32,
		width: "100%",
		backgroundColor: "#FF6C00",
		borderRadius: 100,
		alignItems: "center",
		marginBottom: 16,
	},
	buttonText: {
		fontSize: 16,
		color: "white",
	},
	inputContainer: {},
	input: {
		width: "100%",
		borderBottomWidth: 1,
		borderColor: "#E8E8E8",
		fontSize: 16,
		marginBottom: 22,
	},
	poster: {
		width: "100%",
		height: 240,
		borderColor: "#E8E8E8",
		borderRadius: 8,
		marginBottom: 16,
	},
	commentContainer: {
		borderRadius: 10,
		marginBottom: 4,
		// paddingHorizontal: 6,
		flexDirection: "row",
		width: "100%",
	},
	commentAuthor: {
		fontSize: 14,
		marginTop: 2,
		fontStyle: "italic",
		fontWeight: "500",
		fontFamily: "Roboto-Medium",
	},
	commentText: {
		backgroundColor: "rgba(0, 0, 0, 0.09)",
		width: "90%",
		minHeight: 30,
		borderRadius: 10,
		flexDirection: "column",
		// marginLeft: 4,

		paddingHorizontal: 4,
	},
	InpCont: {
		backgroundColor: "#f6f6f6",
		minHeight: 50,
		borderRadius: 100,
		borderWidth: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingLeft: 16,
		paddingRight: 8,
		// position: "absolute",
		// bottom: 16,
		marginVertical: 4,
		width: "100%",
	},
	InpBtn: {
		backgroundColor: "#FF6C00",
		width: 34,
		height: 34,
		borderRadius: 17,
		justifyContent: "center",
		alignItems: "center",
	},

	textInput: { fontFamily: "Roboto-Medium" },
});
