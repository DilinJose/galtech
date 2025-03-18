import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { AppDispatch } from "../../../redux/store/store";
import { postUserDetails } from "../../../redux/action/LoginAction";
import { ROUTERS } from "../../../utils/common/routes";
import useAuth from "../../../hooks/useAuth";

interface SignupFormValues {
    id: string;
    adminId?: string;
    username: string;
    email: string;
    mobile: string;
    gender: "Male" | "Female" | "";
    dob: string;
    address: string;
    profileImage: string;
    password: string;
    confirmPassword: string;
    role: "admin" | "user" | "";
}

const UserCreate = () => {
    const { auth } = useAuth()
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const [profileImageBase64, setProfileImageBase64] = useState<string>("");

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue,
    } = useForm<SignupFormValues>({ defaultValues: { role: "user" } });

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImageBase64(reader.result as string);
                setValue("profileImage", reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
        try {
            const response: any = await dispatch(postUserDetails({ ...data, adminId: auth?.user.id ?? "" }));

            if (response.meta.requestStatus === "fulfilled") {
                alert("User Created Successfully!");
                navigate(ROUTERS.adminDashboard);
            } else {
                alert("User creation failed! Please try again.");
            }
        } catch (error) {
            console.error("Signup Error:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-6">Signup</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        {...register("username", { required: "Username is required", minLength: { value: 3, message: "Username must be at least 3 characters" } })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Invalid email format" }
                        })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                    <input
                        type="text"
                        placeholder="Mobile"
                        {...register("mobile", {
                            required: "Mobile number is required",
                            pattern: { value: /^[0-9]{10}$/, message: "Invalid mobile number (10 digits required)" }
                        })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}

                    <select
                        {...register("gender", { required: "Gender is required" })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}

                    <input
                        type="date"
                        {...register("dob", { required: "Date of birth is required" })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}

                    <textarea
                        placeholder="Address"
                        {...register("address", { required: "Address is required" })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                    ></textarea>
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {profileImageBase64 && (
                            <img src={profileImageBase64} alt="Preview" className="mt-2 w-24 h-24 rounded-full mx-auto" />
                        )}
                        {errors.profileImage && <p className="text-red-500 text-sm">{errors.profileImage.message}</p>}
                    </div>

                    <input
                        type="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be at least 6 characters" }
                        })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: (value) => value === watch("password") || "Passwords do not match"
                        })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

                    <select
                        {...register("role", { required: "Role is required" })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Role</option>
                        {/* <option value="admin">Admin</option> */}
                        <option value="user">User</option>
                    </select>
                    {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Signup
                    </button>

                    {/* <p className="text-center mt-4 text-sm text-gray-600">
                        Already have an account?
                        <button
                            onClick={() => navigate('/login')}
                            className="text-blue-500 hover:underline ml-1"
                        >
                            Login
                        </button>
                    </p> */}
                </form>
            </div>
        </div>
    );
};

export default UserCreate;
