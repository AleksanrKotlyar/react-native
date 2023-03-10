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
} from "react-native";

import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useSelector } from "react-redux";

export default function CommentsScreen({ navigation, route }) {
	const { postId } = route.params;

	const [comment, setComment] = useState("");
	console.log("comment", comment);
	const [allComments, setAllComments] = useState([]);
	console.log("allComments", allComments);
	const { nickName } = useSelector((state) => state.auth);

	const { uri } = route.params;

	useEffect(() => {
		getAllPosts();
	}, []);

	const createPost = async () => {
		if (comment) {
			const date = new Date();
			const commentDate = date.toLocaleDateString("en-US");
			console.log("commentDate", commentDate);

			const commentValue = {
				text: comment,
				date: commentDate,
				nickName,
			};

			await setDoc(
				doc(db, "posts", postId),
				{ comments: [...allComments, commentValue] },
				{ merge: true }
			);
		}
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
			<SafeAreaView style={styles.container}>
				<FlatList
					data={allComments}
					renderItem={({ item }) => (
						<View style={styles.commentContainer}>
							<Text style={styles.commentAuthor}>{item.nickName}:</Text>
							<Text style={styles.commentText}>{item.text}</Text>
							<Text style={styles.commentText}>{item.date}</Text>
						</View>
					)}
					keyExtractor={(item) => item.id}
				/>
			</SafeAreaView>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					onChangeText={setComment}
					value={comment}
				/>
			</View>
			<TouchableOpacity onPress={createPost} style={styles.sendBtn}>
				<Text style={styles.buttonText}>Comment</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
		alignItems: "center",
	},
	sendBtn: {
		paddingTop: 16,
		paddingBottom: 16,
		paddingLeft: 32,
		paddingRight: 32,
		width: 343,
		backgroundColor: "#FF6C00",
		borderRadius: 100,
		alignItems: "center",
		marginBottom: 16,
	},
	buttonText: {
		fontSize: 16,
		color: "white",
	},
	inputContainer: {
		marginHorizontal: 10,
		marginBottom: 20,
	},
	input: {
		width: 343,
		borderBottomWidth: 1,
		borderColor: "#E8E8E8",
		fontSize: 16,
		marginBottom: 22,
	},
	poster: {
		width: 343,
		height: 240,
		//backgroundColor: "red",
		borderColor: "#E8E8E8",
		borderRadius: 8,
		margin: 32,
	},
	commentAuthor: {
		fontSize: 18,
		marginLeft: "auto",
		marginVertical: 8,
	},
	// commentText: {},
});
