import React, { useEffect, useState } from 'react';
import { createSale, getSale, updateSale } from '../services/SaleService';
import { listClients } from '../services/ClientService'; 
import { useNavigate, useParams } from 'react-router-dom';

const SaleComponent = () => {

	const [comment, setComment] = useState('');
	const [state, setState] = useState('');
	const [date, setDate] = useState('');
	const [saleMethod, setSaleMethod] = useState('');
	const [clientId, setClientId] = useState('');
	const [clients, setClients] = useState([]);

	const { id } = useParams();
	const [errors, setErrors] = useState({
		comment: '',
		state: '',
		date: '',
		saleMethod: '',
		clientId: ''
	});

	const navigator = useNavigate();

	useEffect(() => {
		listClients().then((response) => {
			setClients(response.data);
		}).catch(error => {
			console.error(error);
		});

		if (id) {
			getSale(id).then((response) => {
				setComment(response.data.comentario);
				setState(response.data.estado);
				setDate(response.data.fecha);
				setSaleMethod(response.data.medioPago);
				setClientId(response.data.cliente);
			}).catch(error => {
				console.error(error);
			});
		}
	}, [id]);

	function handleComment(e) {
		setComment(e.target.value);
	}

	function handleState(e) {
		setState(e.target.value);
	}

	function handleDate(e) {
		setDate(e.target.value);
	}

	function handleSaleMethod(e) {
		setSaleMethod(e.target.value);
	}

	function handleClient(e) {
		setClientId(e.target.value);
	}

	function saveOrUpdateSale(e) {
		e.preventDefault();

		if (validateForm()) {
			const sale = { comentario: comment, estado: state, fecha: date, medioPago: saleMethod, cliente: clientId };
			console.log(sale);

			if (id) {
				updateSale(id, sale).then((response) => {
					console.log(response.data);
					navigator('/sale');
				}).catch(error => {
					console.error(error);
				});
			} else {
				createSale(sale).then((response) => {
					console.log(response.data);
					navigator('/sale');
				}).catch(error => {
					console.error(error);
				});
			}
		}
	}

	function validateForm() {
		let valid = true;

		const errorsCopy = { ...errors };

		if (comment.trim()) {
			errorsCopy.comment = '';
		} else {
			errorsCopy.comment = 'Comment is required';
			valid = false;
		}

		if (state.trim()) {
			errorsCopy.state = '';
		} else {
			errorsCopy.state = 'State is required';
			valid = false;
		}

		if (date.trim()) {
			errorsCopy.date = '';
		} else {
			errorsCopy.date = 'Date is required';
			valid = false;
		}

		if (saleMethod.trim()) {
			errorsCopy.saleMethod = '';
		} else {
			errorsCopy.saleMethod = 'Sale Method is required';
			valid = false;
		}

		if (clientId.trim()) {
			errorsCopy.clientId = '';
		} else {
			errorsCopy.clientId = 'Client is required';
			valid = false;
		}

		setErrors(errorsCopy);

		return valid;
	}

	function pageTitle() {
		if (id) {
			return <h2 className='text-center'>Update Sale</h2>;
		} else {
			return <h2 className='text-center'>Add Sale</h2>;
		}
	}

	return (
		<div className='container mx-auto p-4'>
			<div className="flex justify-center">
				<div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
					{pageTitle()}
					<div>
						<form action="">
							<div className='mb-4'>
								<label htmlFor="comment" className="block text-gray-700 font-bold mb-2">
									Comment:
								</label>
								<input
									type="text"
									placeholder="Enter Comment"
									name="comment"
									value={comment}
									className={`block w-full p-2 border ${errors.comment ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-opacity-50`}
									onChange={handleComment}
								/>
								{errors.comment && <p className='text-red-500 text-sm mt-1'>{errors.comment}</p>}
							</div>

							<div className='mb-4'>
								<label htmlFor="state" className="block text-gray-700 font-bold mb-2">
									State:
								</label>
								<input
									type="text"
									placeholder="Enter State"
									name="state"
									value={state}
									className={`block w-full p-2 border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-opacity-50`}
									onChange={handleState}
								/>
								{errors.state && <p className='text-red-500 text-sm mt-1'>{errors.state}</p>}
							</div>

							<div className='mb-4'>
								<label htmlFor="date" className="block text-gray-700 font-bold mb-2">
									Date:
								</label>
								<input
									type="datetime-local"
									name="date"
									value={date}
									className={`block w-full p-2 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-opacity-50`}
									onChange={handleDate}
								/>
								{errors.date && <p className='text-red-500 text-sm mt-1'>{errors.date}</p>}
							</div>

							<div className='mb-4'>
								<label htmlFor="saleMethod" className="block text-gray-700 font-bold mb-2">
									Sale Method:
								</label>
								<input
									type="text"
									placeholder="Enter Sale Method"
									name="saleMethod"
									value={saleMethod}
									className={`block w-full p-2 border ${errors.saleMethod ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-opacity-50`}
									onChange={handleSaleMethod}
								/>
								{errors.saleMethod && <p className='text-red-500 text-sm mt-1'>{errors.saleMethod}</p>}
							</div>

							<div className='mb-4'>
								<label htmlFor="client" className="block text-gray-700 font-bold mb-2">
									Client:
								</label>
								<select
									name="client"
									value={clientId}
									onChange={handleClient}
									className={`block w-full p-2 border ${errors.clientId ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-opacity-50`}
								>
									<option value="">Select a Client</option>
									{clients.map((client) => (
										<option key={client.id} value={client.id}>
											{client.nombre} {client.apellido}
										</option>
									))}
								</select>
								{errors.clientId && <p className='text-red-500 text-sm mt-1'>{errors.clientId}</p>}
							</div>

							<button
								className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
								onClick={saveOrUpdateSale}
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SaleComponent;
