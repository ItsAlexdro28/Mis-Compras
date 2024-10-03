import React, {useEffect, useState} from "react";
import { deleteCategory, listCategories } from "../services/CategoryService";
import { useNavigate } from 'react-router-dom'

const ListCategoriesComponent = () => {

	const [categories, setCategories] = useState([])

	const navigator = useNavigate();

	useEffect(() => {
		getAllCategory();
	}, [])

	function getAllCategory() {
		listCategories().then((response) => {
			setCategories(response.data);
		}).catch(error => {
			console.error(error);
		})
	}

	function addNewCategory() {
		navigator('/add-category')	
	}

	function updateCategory(id) {
		navigator(`/edit-category/${id}`)
		
	}

	function removeCategory(id){
		console.log(id);
		deleteCategory(id).then((response) => {
			getAllCategory();
			console.log("works")
		}).catch(error => {
			console.error(error);
			console.error('not works')
		})
	}

	return (
	<div className="container mx-auto p-4">

		<h2 className="text-center text-2xl font-semibold mb-6">List Categories</h2>
		<button
			className="bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-4 hover:bg-blue-600 transition duration-300"
			onClick={addNewCategory}
		>
			Add Category
		</button>

		<table className="min-w-full bg-white shadow-md rounded-lg">
			<thead>
				<tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
					<th className="py-3 px-6 text-left">Category Id</th>
					<th className="py-3 px-6 text-left">Category Description</th>
					<th className="py-3 px-6 text-left">Category State</th>
					<th className="py-3 px-6 text-center">Actions</th>
				</tr>
			</thead>
			<tbody className="text-gray-600 text-sm font-light">
				{categories.map((category) => (
					<tr key={category.id} className="border-b border-gray-200 hover:bg-gray-100">
						<td className="py-3 px-6 text-left">{category.id}</td>
						<td className="py-3 px-6 text-left">{category.descripcion}</td>
						<td className="py-3 px-6 text-left">{category.estado}</td>
						<td className="py-3 px-6 text-center">
							<button
								className="bg-green-500 text-white font-bold py-1 px-3 rounded-lg mr-2 hover:bg-green-600 transition duration-300"
								onClick={() => updateCategory(category.id)}
							>
								Update
							</button>
							<button
								className="bg-red-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-red-600 transition duration-300"
								onClick={() => removeCategory(category.id)}
							>
								Delete
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

}

export default ListCategoriesComponent
