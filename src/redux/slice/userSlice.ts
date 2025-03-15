import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteUserDetails, getAllUsers, getUserDetails, updateUserDetails } from "../action/LoginAction";

export interface UserTypes {
    id: string;
    username: string;
    email: string;
    mobile: string;
    gender: string;
    dob: string;
    address: string;
    profileImage: string;
    password: string;
    role: "admin" | "user" | "";
}

interface InitialTypes {
    userList: UserTypes[];
    user: UserTypes | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: InitialTypes = {
    userList: [],
    user: null,
    isLoading: false,
    error: null,
};

export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUserDetails.fulfilled, (state, action: PayloadAction<UserTypes>) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || "Login failed";
            });

        builder.addCase(updateUserDetails.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(updateUserDetails.fulfilled, (state) => {
            state.isLoading = false;
            // state.user = action.payload as UserTypes;
        });
        builder.addCase(updateUserDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });

        builder.addCase(getAllUsers.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getAllUsers.fulfilled, (state, action: PayloadAction<UserTypes[]>) => {
            state.isLoading = false;
            state.userList = action.payload;
        });
        builder.addCase(getAllUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
        builder.addCase(deleteUserDetails.fulfilled, (state, action: PayloadAction<string>) => {
            state.userList = state.userList.filter(user => user.id !== action.payload);
          });
    },
});

export default UserSlice.reducer;
