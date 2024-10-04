import React, { useEffect, useState } from 'react';
import { createClient, getClient, updateClient } from '../services/ClientService';
import { useNavigate, useParams } from 'react-router-dom';

const ClientComponent = () => {

	const [nombre, setNombre] = useState('');
	const [apellido, setApellido] = useState('');
	const [celular, setCelular] = useState('');
	const [correo, setCorreo] = useState('');
	const [dirreccion, setDireccion] = useState('');

	const {id} = useParams();
	const [errors, setErrors] = useState({
		nombre: '',
		apellido: '',
		celular: '',
		correo: '',
		dirreccion: ''
	});

	const navigator = useNavigate();

	useEffect(() => {
		if(id){
			getClient(id).then((response) => {
				setNombre(response.data.nombre);
				setApellido(response.data.apellido);
				setCelular(response.data.celular);
				setCorreo(response.data.correo);
				setDireccion(response.data.dirreccion);
			}).catch(error => {
				console.error(error);
			});
		}
	}, [id]);

	function handleInputChange(e) {
		const { name, value } = e.target;
		switch (name) {
			case 'nombre': setNombre(value); break;
			case 'apellido': setApellido(value); break;
			case 'celular': setCelular(value); break;
			case 'correo': setCorreo(value); break;
			case 'dirreccion': setDireccion(value); break;
			default: break;
		}
	}

	function saveOrUpdateClient(e) {
		e.preventDefault();

		if(validateForm()) {
			const client = { nombre, apellido, celular, correo, dirreccion };
			console.log(client);

			if(id){
				updateClient(id, client).then((response) => {
					console.log(response.data);
					navigator('/client');
				}).catch(error => {
					console.error(error);
				});
			} else {
				createClient(client).then((response) => {
					console.log(response.data);
					navigator('/client');
				}).catch(error => {
					console.error(error);
				});
			}
		}
	}

	function validateForm() {
		let valid = true;
		const errorsCopy = {...errors};

		if(nombre.trim()){
			errorsCopy.nombre = '';
		} else {
			errorsCopy.nombre = 'Name is required';
			valid = false;
		}

		if(apellido.trim()){
			errorsCopy.apellido = '';
		} else {
			errorsCopy.apellido = 'Last name is required';
			valid = false;
		}

		if(celular.trim()){
			errorsCopy.celular = '';
		} else {
			errorsCopy.celular = 'Phone number is required';
			valid = false;
		}

		if(correo.trim()){
			errorsCopy.correo = '';
		} else {
			errorsCopy.correo = 'Email is required';
			valid = false;
		}

		if(dirreccion.trim()){
			errorsCopy.dirreccion = '';
		} else {
			errorsCopy.dirreccion = 'Address is required';
			valid = false;
		}

		setErrors(errorsCopy);
		return valid;
	}

	function pageTitle() {
		return id ? <h2 className='text-center'>Update Client</h2> : <h2 className='text-center'>Add Client</h2>;
	}

	return (
		<div className='container mx-auto p-4'>
			<div className="flex justify-center">
				<div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
					{pageTitle()}
					<form>
						<div className='mb-4'>
							<label className="block text-gray-700 font-bold mb-2">Name:</label>
							<input
								type="text"
								name="nombre"
								placeholder="Enter Name"
								value={nombre}
								className={`block w-full p-2 border ${errors.nombre ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
								onChange={handleInputChange}
							/>
							{errors.nombre && <p className='text-red-500 text-sm mt-1'>{errors.nombre}</p>}
						</div>

						<div className='mb-4'>
							<label className="block text-gray-700 font-bold mb-2">Last Name:</label>
							<input
								type="text"
								name="apellido"
								placeholder="Enter Last Name"
								value={apellido}
								className={`block w-full p-2 border ${errors.apellido ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
								onChange={handleInputChange}
							/>
							{errors.apellido && <p className='text-red-500 text-sm mt-1'>{errors.apellido}</p>}
						</div>

						<div className='mb-4'>
							<label className="block text-gray-700 font-bold mb-2">Phone Number:</label>
							<input
								type="number"
								name="celular"
								placeholder="Enter Phone Number"
								value={celular}
								className={`block w-full p-2 border ${errors.celular ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
								onChange={handleInputChange}
							/>
							{errors.celular && <p className='text-red-500 text-sm mt-1'>{errors.celular}</p>}
						</div>

						<div className='mb-4'>
							<label className="block text-gray-700 font-bold mb-2">Email:</label>
							<input
								type="email"
								name="correo"
								placeholder="Enter Email"
								value={correo}
								className={`block w-full p-2 border ${errors.correo ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
								onChange={handleInputChange}
							/>
							{errors.correo && <p className='text-red-500 text-sm mt-1'>{errors.correo}</p>}
						</div>

						<div className='mb-4'>
							<label className="block text-gray-700 font-bold mb-2">Address:</label>
							<input
								type="text"
								name="dirreccion"
								placeholder="Enter Address"
								value={dirreccion}
								className={`block w-full p-2 border ${errors.dirreccion ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
								onChange={handleInputChange}
							/>
							{errors.dirreccion && <p className='text-red-500 text-sm mt-1'>{errors.dirreccion}</p>}
						</div>

						<button
							className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
							onClick={saveOrUpdateClient}
						>
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ClientComponent;
