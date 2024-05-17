// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// export const Home = () => {
//     const [open, setOpen] = useState(false);
//     const [name, setName] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(false);

//     const navigate = useNavigate();

//     return (
//         <div className="w-full h-full flex justify-center items-center flex-col relative">
//             {!open && (
//                 <div>
//                     <button
//                         className="bg-green-400 w-60 h-14 text-xl font-bold font-sans"
//                         onClick={() => setOpen(true)}
//                     >
//                         Play online
//                     </button>
//                 </div>
//             )}

//             {open && (
//                 <div
//                     className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50 p-4 flex-col"
//                     onClick={() => setOpen(false)}
//                 >
//                     <button
//                         onClick={() => setOpen(false)}
//                         className="p-2 font-bold text-4xl relative left-36"
//                     >
//                         <i className="fa-solid fa-xmark"></i>
//                     </button>
//                     <div
//                         className="transition-all duration-500 ease-in-out transform bg-gray-700 rounded-lg p-6"
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         <input
//                             type="text"
//                             placeholder="Enter your name"
//                             className="bg-transparent border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full text-white font-bold"
//                             onChange={(e) => setName(e.target.value)}
//                         />
//                         <button
//                             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
//                             onClick={async () => {
//                                 setLoading(true);
//                                 try {
//                                     const res = await axios.post("http://localhost:4000/name", {
//                                         name,
//                                     });
//                                     if (res.status === 200) {
//                                         console.log(res.data);
//                                         navigate("/play/online");
//                                     }
//                                 } catch (error) {
//                                     console.error("Error:", error);
//                                     setError(error.response.data.message);
//                                 } finally {
//                                     setLoading(false);
//                                 }
//                             }}
//                         >
//                             {loading ? "Loading....." : "Play"}
//                         </button>
//                     </div>
//                     {error && <span>{error}</span>}
//                 </div>
//             )}
//         </div>
//     );
// };


import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

export const Home = () => {

    const user = localStorage.getItem('user');
    if (user) {
        return <Navigate to={"/play/online"} />
    }

    return (
        <div className='flex justify-center items-center h-full flex-col gap-5'>
            <Link to="/login">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-32">
                    Login
                </button>
            </Link>
            <Link to="signup">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-32">
                    Sign Up
                </button>
            </Link>
        </div>
    )
}
