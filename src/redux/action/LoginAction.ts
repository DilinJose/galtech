import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserTypes } from "../slice/userSlice";
import { deleteData, getData, patchData, postData, putData } from "../../api/Service";

interface LoginPayload {
    email: string;
    password: string;
}

export const getAllUsers = createAsyncThunk<UserTypes[]>(
    "GET_ALL_USERS",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getData<UserTypes[]>("/users");

            const users = response.data.filter((user) => user.role.toLowerCase() === "user");

            return users;
        } catch (err: any) {
            return rejectWithValue(err?.response?.data || "Fetching users failed");
        }
    }
);


export const getUserDetails = createAsyncThunk<UserTypes, LoginPayload>(
    "GET_LOGIN_DETAILS",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await getData<UserTypes[]>("/users");
            const user = response.data.find(
                (user) =>
                    user.email.toLowerCase() === payload.email.toLowerCase() &&
                    user.password === payload.password
            );
            if (user) {
                return user;
            } else {
                alert("Invalid email or password")
                return rejectWithValue("Invalid email or password");
            }
        } catch (err: any) {
            alert("Login failed")
            return rejectWithValue(err?.response?.data || "Login failed");
        }
    }
);

export const postUserDetails = createAsyncThunk(
    "POST_USER_DETAILS",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await postData("/users", payload);


        } catch (err: any) {
            alert("Login failed")
            return rejectWithValue(err?.response?.data || "Login failed");
        }
    }
);


export const updateUserDetails = createAsyncThunk(
    "UPDATE_USER_DETAILS",
    async (payload: Partial<UserTypes>, { rejectWithValue }) => {
        const { id, ...rest } = payload
        try {
            const response = await putData(`/users/${payload.id}`, rest);
            return response.data;
        } catch (err: any) {
            alert("Update failed")
            return rejectWithValue(err?.response?.data || "Update failed");
        }
    }
);

export const deleteUserDetails = createAsyncThunk(
    "DELETE_USER_DETAILS",
    async (id: string, { rejectWithValue }) => {
        try {
            await deleteData(`/users/${id}`);
            return id; 
        } catch (err: any) {
            alert("Delete failed")
            return rejectWithValue(err?.response?.data || "Delete failed");
        }
    }
);

export const updatePassword = createAsyncThunk(
    "UPDATE_PASSWORD",
    async ({ id, currentPassword, newPassword }: { id: string; currentPassword: string; newPassword: string }, { rejectWithValue }) => {
        try {
            const response = await getData<UserTypes[]>(`/users`);
            const user = response.data.find((user) => user.id === id);
            if (!user) {
                return rejectWithValue("User not found");
            }

            if (user.password !== currentPassword) {
                return rejectWithValue("Current password is incorrect");
            }

            const updateResponse = await patchData(`/users/${id}`, { password: newPassword });
            return updateResponse.data;

        } catch (err: any) {
            alert("Failed to update password")
            return rejectWithValue(err?.response?.data || "Failed to update password");
        }
    }
);
