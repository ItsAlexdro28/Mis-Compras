import React, { useEffect, useState } from 'react';
import { listSales, deleteSale } from '../services/SaleService';
import { useNavigate } from 'react-router-dom';

const ListSaleComponent = () => {
	const [sales, setSales] = useState([]);
	const navigator = useNavigate();

	useEffect(() => {
		fetchSales();
	}, []);

	const fetchSales = () => {
		listSales().then((response) => {
			setSales(response.data);
		}).catch(error => {
			console.error('Error fetching sales:', error);
		});
	};

	const handleDelete = (id) => {
		deleteSale(id).then(() => {
			setSales(sales.filter(sale => sale.id !== id));
		}).catch(error => {
			console.error('Error deleting sale:', error);
		});
	};

	const handleUpdate = (id) => {
		navigator(`/update-sale/${id}`);
	};

	const handleAddSale = () => {
		navigator('/add-sale');
	};

	return (
		<div className="container mx-auto p-4">
			<h2 className="text-center text-2xl font-bold mb-4">Sales List</h2>
			<button
				className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 mb-4 transition duration-300"
				onClick={handleAddSale}
			>
				Add Sale
			</button>
			<div className="overflow-x-auto">
				<table className="table-auto w-full bg-white shadow-lg rounded-lg">
					<thead>
						<tr>
							<th className="px-4 py-2 border">ID</th>
							<th className="px-4 py-2 border">Comment</th>
							<th className="px-4 py-2 border">State</th>
							<th className="px-4 py-2 border">Date</th>
							<th className="px-4 py-2 border">Sale Method</th>
							<th className="px-4 py-2 border">Client</th>
							<th className="px-4 py-2 border">Actions</th>
						</tr>
					</thead>
					<tbody>
						{sales.length === 0 ? (
							<tr>
								<td colSpan="7" className="text-center py-4">No sales found</td>
							</tr>
						) : (
							sales.map((sale) => (
								<tr key={sale.id}>
									<td className="px-4 py-2 border">{sale.id}</td>
									<td className="px-4 py-2 border">{sale.comentario}</td>
									<td className="px-4 py-2 border">{sale.estado}</td>
									<td className="px-4 py-2 border">{new Date(sale.fecha).toLocaleString()}</td>
									<td className="px-4 py-2 border">{sale.medio_pago}</td>
									<td className="px-4 py-2 border">{`${sale.cliente_nombre} ${sale.cliente_apellido}`}</td>
									<td className="px-4 py-2 border text-center">
										<button
											className="bg-yellow-500 text-white font-bold py-1 px-2 rounded-lg hover:bg-yellow-600 transition duration-300 mr-2"
											onClick={() => handleUpdate(sale.id)}
										>
											Update
										</button>
										<button
											className="bg-red-500 text-white font-bold py-1 px-2 rounded-lg hover:bg-red-600 transition duration-300"
											onClick={() => handleDelete(sale.id)}
										>
											Delete
										</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ListSaleComponent;
