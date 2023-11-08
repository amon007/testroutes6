import React from "react";
import { Link } from "react-router-dom";

export default function AdminNavigation() {
    const logOut = () => {
        localStorage.setItem('jwtToken', '')
    }

    return <>
                <nav className="bg-white  border-gray-200 dark:bg-gray-900">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                        <Link to="/dashboard" className="flex items-center">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">DASHBOARD</span>
                        </Link>
                        <div className="flex items-center">
                            <a href="/login" onClick={logOut}  className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Log Out</a>
                        </div>
                    </div>
                </nav>
                <nav className="bg-gray-50 dark:bg-gray-700">
                    <div className="max-w-screen-xl px-4 py-3 mx-auto">
                        <div className="flex items-center">
                            <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
                                <li>
                                    <Link to="/dashboard">Home/Delete Product</Link>
                                </li>
                                <li>
                                    <Link to="/addproduct" className="text-gray-900 dark:text-white hover:underline">Add Product</Link>
                                </li>
                                <li>
                                    <Link to="/addcategory" className="text-gray-900 dark:text-white hover:underline">Add Category</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </>
}