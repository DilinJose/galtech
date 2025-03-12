import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../redux/action/LoginAction";
import { AppDispatch, RootState } from "../../redux/store/store";
import Body from "../../components/layout/body/Body";

const ChangePassword = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.user); 

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (data: any) => {
    
        dispatch(updatePassword({ id: user?.id, currentPassword: data.currentPassword, newPassword: data.newPassword }))
    .unwrap()
    .then(() => {
      alert("Password updated successfully!");
      reset();
    })
    .catch((err) => alert(err));
    };

    return (
        <Body>
            <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-md">
                <h2 className="text-lg font-semibold mb-4">Change Password</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <input
                        {...register("currentPassword", { required: "Current password is required" })}
                        type="password"
                        placeholder="Current Password"
                        className="border p-2 w-full"
                    />
                    {errors.currentPassword && <p className="text-red-500 text-sm">{errors.currentPassword.message}</p>}

                    <input
                        {...register("newPassword", { required: "New password is required", minLength: 6 })}
                        type="password"
                        placeholder="New Password"
                        className="border p-2 w-full"
                    />
                    {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}

                    <input
                        {...register("confirmPassword", {
                            required: "Confirm password is required",
                            validate: (value) => value === watch("newPassword") || "Passwords do not match",
                        })}
                        type="password"
                        placeholder="Confirm Password"
                        className="border p-2 w-full"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Update Password
                    </button>
                </form>
            </div>
        </Body>
    );
};

export default ChangePassword;
