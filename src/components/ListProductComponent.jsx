import React, {useEffect, useState} from "react";
import { deleteProduct, listProducts } from "../services/ProductService";
import { useNavigate } from 'react-router-dom'

const ListProductsComponent = () => {

	const [products, setProducts] = useState([])

	const navigator = useNavigate();

	useEffect(() => {
		getAllProduct();
	}, [])

	function getAllProduct() {
		listProducts().then((response) => {
			setProducts(response.data);
		}).catch(error => {
			console.error(error);
		})
	}

	function addNewProduct() {
		navigator('/add-product')	
	}

	function updateProduct(id) {
		navigator(`/edit-product/${id}`)
		
	}

	function removeProduct(id){
		console.log(id);
		deleteProduct(id).then((response) => {
			getAllProduct();
			console.log("works")
		}).catch(error => {
			console.error(error);
			console.error('not works')
		})
	}

	return (
	<div className="container mx-auto p-4">

		<h2 className="text-center text-2xl font-semibold mb-6">List Products</h2>
		<button
			className="bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-4 hover:bg-blue-600 transition duration-300"
			onClick={addNewProduct}
		>
			Add Product
		</button>

		<table className="min-w-full bg-white shadow-md rounded-lg">
			<thead>
				<tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
					<th className="py-3 px-6 text-left">Product Id</th>
					<th className="py-3 px-6 text-left">Product Name</th>
					<th className="py-3 px-6 text-left">Product Id Category</th>
					<th className="py-3 px-6 text-left">Product Barcode</th>
					<th className="py-3 px-6 text-left">Product Sale Price</th>
					<th className="py-3 px-6 text-left">Product Stock Quantity</th>
					<th className="py-3 px-6 text-left">Product Stock State</th>
					<th className="py-3 px-6 text-center">Actions</th>
				</tr>
			</thead>
			<tbody className="text-gray-600 text-sm font-light">
				{products.map((product) => (
					<tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
						<td className="py-3 px-6 text-left">{product.id}</td>
						<td className="py-3 px-6 text-left">{product.nombre}</td>
						<td className="py-3 px-6 text-left">{product.idCategoria}</td>
						<td className="py-3 px-6 text-left">{product.codigoBarras}</td>
						<td className="py-3 px-6 text-left">{product.precioVenta}</td>
						<td className="py-3 px-6 text-left">{product.cantidadStock}</td>
						<td className="py-3 px-6 text-left">{product.estado}</td>
						<td className="py-3 px-6 text-center">
							<button
								className="bg-green-500 text-white font-bold py-1 px-3 rounded-lg mr-2 hover:bg-green-600 transition duration-300"
								onClick={() => updateProduct(product.id)}
							>
								Update
							</button>
							<button
								className="bg-red-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-red-600 transition duration-300"
								onClick={() => removeProduct(product.id)}
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

export default ListProductsComponent
