import React, { useEffect, useState } from "react";
import { deleteClient, listClients } from "../services/ClientService";
import { useNavigate } from 'react-router-dom';

const ListClientsComponent = () => {

	const [clients, setClients] = useState([]);
	const navigator = useNavigate();

	useEffect(() => {
		getAllClients();
	}, []);

	function getAllClients() {
		listClients().then((response) => {
			setClients(response.data);
		}).catch(error => {
			console.error(error);
		});
	}

	function addNewClient() {
		navigator('/add-client');
	}

	function updateClient(id) {
		navigator(`/edit-client/${id}`);
	}

	function removeClient(id) {
		deleteClient(id).then((response) => {
			getAllClients();
		}).catch(error => {
			console.error(error);
		});
	}

	return (
		<div className="container mx-auto p-4">
			<h2 className="text-center text-2xl font-semibold mb-6">List of Clients</h2>
			<button
				className="bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-4 hover:bg-blue-600 transition duration-300"
				onClick={addNewClient}
			>
				Add Client
			</button>

			<table className="min-w-full bg-white shadow-md rounded-lg">
				<thead>
					<tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
						<th className="py-3 px-6 text-left">Client ID</th>
						<th className="py-3 px-6 text-left">Name</th>
						<th className="py-3 px-6 text-left">Last Name</th>
						<th className="py-3 px-6 text-left">Phone</th>
						<th className="py-3 px-6 text-left">Email</th>
						<th className="py-3 px-6 text-left">Address</th>
						<th className="py-3 px-6 text-left">Actions</th>
					</tr>
				</thead>
				<tbody className="text-gray-700 text-sm font-light">
					{clients.map(client => (
						<tr key={client.id} className="border-b border-gray-200 hover:bg-gray-100">
							<td className="py-3 px-6 text-left">{client.id}</td>
							<td className="py-3 px-6 text-left">{client.nombre}</td>
							<td className="py-3 px-6 text-left">{client.apellido}</td>
							<td className="py-3 px-6 text-left">{client.celular}</td>
							<td className="py-3 px-6 text-left">{client.correo}</td>
							<td className="py-3 px-6 text-left">{client.dirreccion}</td>
							<td className="py-3 px-6 text-left">
								<button
									className="bg-green-500 text-white py-1 px-3 rounded-lg hover:bg-green-600 mr-2"
									onClick={() => updateClient(client.id)}
								>
									Update
								</button>
								<button
									className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
									onClick={() => removeClient(client.id)}
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
};

export default ListClientsComponent;
