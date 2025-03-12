import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { AppDispatch } from "../../../redux/store/store";
import { useForm } from "react-hook-form";
import { updateUserDetails } from "../../../redux/action/LoginAction";
import { ROUTERS } from "../../../utils/common/routes";

const UserEdit = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const [previewImage, setPreviewImage] = useState(state?.profileImage || "");

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: state || {},
    });


    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setPreviewImage(base64String);
                setValue("profileImage", base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = (data: any) => {
        dispatch(updateUserDetails(data));
        navigate(ROUTERS.users);
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-md">
            <h2 className="text-lg font-semibold mb-4">Edit User</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <input
                    {...register("username", { required: "Username is required" })}
                    placeholder="Username"
                    className="border p-2 w-full"
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

                <input
                    {...register("email", { required: "Email is required" })}
                    placeholder="Email"
                    className="border p-2 w-full"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                <input
                    {...register("mobile", { required: "Mobile number is required" })}
                    placeholder="Mobile"
                    className="border p-2 w-full"
                />
                {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}

                <select {...register("gender", { required: "Gender is required" })} className="border p-2 w-full">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}

                <input
                    {...register("dob", { required: "Date of Birth is required" })}
                    type="date"
                    className="border p-2 w-full"
                />
                {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}

                <textarea
                    {...register("address", { required: "Address is required" })}
                    placeholder="Address"
                    className="border p-2 w-full"
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}

                {/* Profile Image Upload */}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="border p-2 w-full" />
                {previewImage && <img src={previewImage} alt="Profile Preview" className="w-20 h-20 mt-2 rounded-full" />}

                <label>password</label>
                <input
                    {...register("password", { required: "Password is required" })}
                    type="text"
                    placeholder="Password"
                    className="border p-2 w-full"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Update
                </button>
            </form>
        </div>
    );
};

export default UserEdit;
