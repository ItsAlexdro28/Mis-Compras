import React, {useEffect, useState} from "react";
import { deleteCategory, listCategories } from "../services/categoryService";
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
		navigator(`edit-category/${id}`)
		
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
	<div className="container">

		<h2 className="text-center">ListCategories</h2>
		<button className="btn btn-primary mb-2"onClick={addNewCategory}>Add Category</button>
		<table className="table table-striped table-bordered">
			<thead>
				<tr>
					<th>Categoria Id</th>
					<th>Categoria Description</th>
					<th>Categoria State</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{
					categories.map(category => 
						<tr key={category.id}>
							<td>{category.id}</td>
							<td>{category.descripcion}</td>
							<td>{category.estado}</td>
							<td>
								<button className="btn btn-info" onClick={() => updateCategory(category.id)}>Update</button>
								<button className="btn btn-danger" onClick={() => removeCategory(category.id)}>Delete</button>
							</td>
						</tr>)

				}
			</tbody>

		</table>

	
	</div>

	)

}

export default ListCategoriesComponent
