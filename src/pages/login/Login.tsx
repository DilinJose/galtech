import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { getInitialRoute } from '../../utils/getInitialRoute';
import { useDispatch } from 'react-redux';
import { getUserDetails } from '../../redux/action/LoginAction';
import { AppDispatch } from '../../redux/store/store';
import { ROUTERS } from '../../utils/common/routes';
import useAuth from '../../hooks/useAuth';

interface FormValues {
    email: string;
    password: string;
}

const Login = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setLoading(true);
        try {
            const response: any = await dispatch(getUserDetails(data));
            const userDetails = {
                username: response?.payload?.username ?? "",
                email: response?.payload?.email ?? "",
                mobile: response?.payload?.mobile ?? "",
                gender: response?.payload?.gender ?? "",
                profileImage: response?.payload?.profileImage ?? "",
            };
            const role = response?.payload?.role ?? "";

            const userData = { user: userDetails, role: role, authToken: "asdasd87aysf8a7sfa8sfa9s8f79as8f7" };
            setAuth(userData);
            navigate(getInitialRoute(userData.role), { replace: true });
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            {...register("password", { required: "Password is required" })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full text-white py-2 rounded-lg transition duration-300 ${
                            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                        }`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <svg
                                    className="animate-spin h-5 w-5 mr-2 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8H4z"
                                    ></path>
                                </svg>
                                Logging in...
                            </div>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>
                <p className="text-center mt-4 text-sm text-gray-600">
                    Don't have an account?
                    <button
                        onClick={() => navigate(ROUTERS.signUp)}
                        className="text-blue-500 hover:underline ml-1"
                    >
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
