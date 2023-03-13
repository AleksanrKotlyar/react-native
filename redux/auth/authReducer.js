import { createSlice } from "@reduxjs/toolkit";

const state = {
	userId: null,
	nickName: null,
	stateChange: false,
};

export const authSlice = createSlice({
	name: "auth",
	initialState: state,
	reducers: {
		updateUserProfile: (state, { payload }) => ({
			...state,
			userId: payload.userId,
			nickName: payload.nickName,
			email: payload.email,
			avatarURL: payload.avatarURL,
		}),
		authStateChange: (state, { payload }) => ({
			...state,
			stateChange: payload.stateChange,
		}),
		authSignOut: () => state,
		changeAvatarPhoto: (state, { payload }) => ({
			...state,
			avatarURL: payload.avatarURL,
		}),
	},
});
