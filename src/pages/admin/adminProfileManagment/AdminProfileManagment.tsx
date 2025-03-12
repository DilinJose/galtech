import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { RootState, AppDispatch } from "../../../redux/store/store";
import Body from "../../../components/layout/body/Body";
import { updateUserDetails } from "../../../redux/action/LoginAction";

interface FormValues {
    username: string;
    email: string;
    mobile: string;
    gender: "Male" | "Female" | "";
    dob: string;
    address: string;
    profileImage: string;
    password: string;
    role: "admin" | "user" | "";
}

const AdminProfileManagement = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userDetails = useSelector((state: RootState) => state.user.user);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            username: userDetails?.username ?? "",
            email: userDetails?.email ?? "",
            mobile: userDetails?.mobile ?? "",
            gender: userDetails?.gender as "Male" | "Female" | "" ?? "",
            dob: userDetails?.dob ?? "",
            address: userDetails?.address ?? "",
            profileImage: userDetails?.profileImage ?? "",
            password: "",
            role: userDetails?.role ?? "",
        },
    });


    const [imagePreview, setImagePreview] = useState(userDetails?.profileImage || "");

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setValue("profileImage", base64String);
                setImagePreview(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        dispatch(updateUserDetails(data));
    };

    return (
        <Body>
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6">Edit Profile</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Username */}
                    <input
                        type="text"
                        placeholder="Username"
                        {...register("username", { required: "Username is required" })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email", { required: "Email is required" })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled
                    />

                    {/* Mobile */}
                    <input
                        type="text"
                        placeholder="Mobile"
                        {...register("mobile", { required: "Mobile is required" })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}

                    {/* Gender */}
                    <select
                        {...register("gender", { required: "Gender is required" })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}

                    {/* Date of Birth */}
                    <input
                        type="date"
                        {...register("dob", { required: "Date of birth is required" })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}

                    {/* Address (Textarea) */}
                    <textarea
                        placeholder="Address"
                        {...register("address", { required: "Address is required" })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}

                    {/* Profile Image Upload */}
                    <div className="flex flex-col items-center">
                        {imagePreview && <img src={imagePreview} alt="Profile" className="w-24 h-24 rounded-full mb-2" />}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="border p-2 rounded-lg w-full"
                        />
                    </div>

                    {/* Password */}
                    <input
                        type="password"
                        placeholder="New Password (Optional)"
                        {...register("password")}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </Body>
    );
};

export default AdminProfileManagement;
