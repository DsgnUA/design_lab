import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import {
  getAllUsers,
  patchUser,
  patchUsers,
  getUnpublishedPosts,
  getUnpublishedPostById,
  patchCheckSub,
} from "./admin.thunk";
import { AdminState } from "../../types/state.types";
import { GetPost } from "../../types/posts.types";
import { UserList } from "../../types/auth.types";

const handleGetAllUsersPending = (state: AdminState) => {
  state.isLoadingMore = true;
  state.error = "";
};

const handlePatchUsersPending = (state: AdminState) => {
  state.isLoadingUpdate = true;
  state.error = "";
};

const handlePatchCheckSubPending = (state: AdminState) => {
  state.isLoadingCheck = true;
  state.error = "";
};

const handlePostsPending = (state: AdminState) => {
  state.isLoadingPost = true;
  state.error = "";
};

const handleGetAllUsersFulfilled = (
  state: AdminState,
  action: PayloadAction<{ users: UserList[]; totalHits: number }>
) => {
  state.isLoadingMore = false;
  const newUsers = action.payload.users.filter(
    (newUser) =>
      !state.folowers.some((existingUser) => existingUser._id === newUser._id)
  );
  state.folowers = [...state.folowers, ...newUsers];
  state.totalFolowers = action.payload.totalHits;
};

const handlePatchUserFulfilled = (
  state: AdminState,
  action: PayloadAction<UserList>
) => {
  state.isLoadingUpdate = false;
  const index = state.folowers.findIndex((i) => action.payload._id === i._id);
  state.folowers.splice(index, 1, action.payload);
};

const handlePatchUsersFulfilled = (
  state: AdminState,
  action: PayloadAction<{ users: UserList[]; totalHits: number }>
) => {
  state.isLoadingUpdate = false;
  state.folowers = action.payload.users;
  state.totalFolowers = action.payload.totalHits;
};

const handlePatchCheckSubFulfilled = (
  state: AdminState,
  action: PayloadAction<{ users: UserList[]; totalHits: number }>
) => {
  state.isLoadingCheck = false;
  state.folowers = action.payload.users;
  state.totalFolowers = action.payload.totalHits;
};

const handleGetUnpublishedPostsFulfilled = (
  state: AdminState,
  action: PayloadAction<{ posts: GetPost[]; totalHits: number }>
) => {
  state.isLoadingPost = false;
  state.unpublPosts = action.payload.posts;
  state.totalPosts = action.payload.totalHits;
};

const handleGetUnpublishedPostsByIdFulfilled = (
  state: AdminState,
  action: PayloadAction<GetPost>
) => {
  state.isLoadingPost = false;
  state.unpublPost = action.payload;
};

const handleRejected = (state: AdminState, action: PayloadAction<string>) => {
  state.isLoadingPost = false;
  state.isLoadingCheck = false;
  state.isLoadingUpdate = false;
  state.isLoadingMore = false;
  state.error = action.payload;
};

const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getAllUsers.pending, handleGetAllUsersPending)
      .addCase(getAllUsers.fulfilled, handleGetAllUsersFulfilled)
      .addCase(patchUser.pending, handlePatchUsersPending)
      .addCase(patchUser.fulfilled, handlePatchUserFulfilled)
      .addCase(patchUsers.pending, handlePatchUsersPending)
      .addCase(patchUsers.fulfilled, handlePatchUsersFulfilled)
      .addCase(patchCheckSub.pending, handlePatchCheckSubPending)
      .addCase(patchCheckSub.fulfilled, handlePatchCheckSubFulfilled)
      .addCase(getUnpublishedPosts.pending, handlePostsPending)
      .addCase(
        getUnpublishedPosts.fulfilled,
        handleGetUnpublishedPostsFulfilled
      )
      .addCase(getUnpublishedPostById.pending, handlePostsPending)
      .addCase(
        getUnpublishedPostById.fulfilled,
        handleGetUnpublishedPostsByIdFulfilled
      )
      .addMatcher(
        ({ type }) => type.endsWith("/rejected") && type.startsWith("admin"),
        handleRejected
      ),
});

export const adminReducer = adminSlice.reducer;
