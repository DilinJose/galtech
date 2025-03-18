import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserTypes } from "../slice/userSlice";
import { deleteData, getData, patchData, postData, putData } from "../../api/Service";
import { UserType } from "../../context/AuthProvider";
interface LoginPayload {
    email: string;
    password: string;
    role: string
}

export const getAllUsers = createAsyncThunk<UserTypes[], UserType>(
    "GET_ALL_USERS",
    async (payload, { rejectWithValue }) => {
        const admin = payload.id;
        try {
            const response = await getData<UserTypes[]>("/users");

            const users = response.data.filter(
                (user) => user.role.toLowerCase() === "user" && user.adminId === admin
            );

            return users;
        } catch (err: any) {
            return rejectWithValue(err?.response?.data || "Fetching users failed");
        }
    }
);

export const getUserDetails = createAsyncThunk<UserTypes, LoginPayload>(
    "GET_LOGIN_DETAILS",
    async (payload, { rejectWithValue }) => {
        console.log('payload', payload)
        try {
            const response = await getData<UserTypes[]>(`/${payload.role}`);
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

export const getAdminDetails = createAsyncThunk<UserTypes, LoginPayload>(
    "GET_LOGIN_DETAILS",
    async (payload, { rejectWithValue }) => {
        try {
            const response = await getData<UserTypes[]>("/admin");
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
    async (payload: any, { rejectWithValue }) => {
        try {
            const response = await postData("/users", payload);
            return response.data
        } catch (err: any) {
            alert("Login failed")
            return rejectWithValue(err?.response?.data || "Login failed");
        }
    }
);

export const postAdminDetails = createAsyncThunk(
    "POST_USER_DETAILS",
    async (payload: any, { rejectWithValue }) => {
        try {
            const response = await postData("/admin", payload);
            return response.data
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
            await putData(`/users/${id}`, rest);
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
