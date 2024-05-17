import axios from "axios";
import { ChangeEventHandler, useState } from "react";
import { LabelledInput } from "./Login";
import { Link, Navigate, useNavigate } from "react-router-dom";

export function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    const userLoaclStorage = localStorage.getItem("user");
    if (userLoaclStorage) {
        return <Navigate to={"/play/online"} />;
    }

    const handleSignUp = async () => {
        setLoading(true);
        try {
            const res = await axios.post(
                "http://localhost:4000/signup",
                { name, email, password },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            const userData = res.data.newUser;
            localStorage.setItem("user", JSON.stringify(userData));
            console.log(res.data);
            navigate("/play/online");
            console.log(res.data);
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
                            <div className="text-3xl font-extrabold">Sign Up</div>
                        </div>
                        <div className="pt-2">
                            <LabelledInput
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                label="Name"
                                placeholder="Enter you name"
                            />
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
                                placeholder="Enter your passwroed"
                            />
                            <button
                                type="button"
                                className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                onClick={handleSignUp}
                            >
                                {loading ? "Loading..." : "Sign Up"}
                            </button>

                            <p className="mt-3">
                                already have a account{" "}
                                <Link to="/login" className="text-blue-500 underline font-bold">
                                    Login
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
