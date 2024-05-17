import axios from "axios";
import { ChangeEventHandler, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const user = localStorage.getItem("user");
    if (user) {
        return <Navigate to={"/play/online"} />;
    }

    const handleLogin = async () => {
        setLoading(true);
        try {
            const res = await axios.post(
                "https://tic-toc-toe-backend.vercel.app/login",
                { email, password },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            navigate("/play/online");
            console.log(res.data);
            const userData = res.data.user;
            localStorage.setItem("user", JSON.stringify(userData));
        } catch (error) {
            setError(error.response?.data?.message);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center flex-col items-center">
                <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
                    <div>
                        <div className="px-10">
                            <div className="text-3xl font-extrabold">Login</div>
                        </div>
                        <div className="pt-2">
                            <LabelledInput
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                label="Email"
                                placeholder="Enter you email"
                            />
                            <LabelledInput
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                label="Password"
                                type={"password"}
                                placeholder="Enter you password"
                            />
                            <button
                                type="button"
                                className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                onClick={handleLogin}
                            >
                                {loading ? "Loading..." : "Login"}
                            </button>
                            <p className="mt-3">
                                don't have a account{" "}
                                <Link
                                    to="/signup"
                                    className="text-blue-500 underline font-bold"
                                >
                                    sing up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                <span className="mt-5 text-xl text-red-600">{error}</span>
            </div>
        </div>
    );
}

export function LabelledInput({ label, placeholder, type, onChange }) {
    return (
        <div>
            <label className="block mb-2 text-sm text-black font-semibold pt-4">
                {label}
            </label>
            <input
                onChange={onChange}
                type={type || "text"}
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
                required
            />
        </div>
    );
}
