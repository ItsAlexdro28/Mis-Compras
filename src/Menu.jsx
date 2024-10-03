import React from "react";

const Menu = () => {


	return (
		<div className="container">
			<h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Welcome</h1>
			<a href="/category/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-3">Category</a>
			<a href="/client/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-3">Client</a>
			<a href="/sale/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-3">Sale</a>
			<a href="/product/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-3">Product</a>
			<a href="/sales-product/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-3">Sales Product</a>
		</div>
	)

}

export default Menu

