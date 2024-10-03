import react, { useEffect, useState } from 'react';
import { createCategory, getCategory, updateCategory } from '../services/CategoryService';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryComponent = () => {

	const [descripcion, setDescripcion] = useState('')
	const [estado, setEstado] = useState('')

	const {id} = useParams();
	const [errors, setErrors] = useState({
		descripcion: '',
		estado: ''
	})

	const navigator = useNavigate();

	useEffect(() => {
		
		if(id){
			getCategory(id).then((response) => {
				setDescripcion(response.data.descripcion);
				setEstado(response.data.estado);
			}).catch(error => {
				console.error(error);
			})
		}

	},	[id])

	function handleDescription (e) {
		setDescripcion(e.target.value);
	}

	function handleState (e) {
		setEstado(e.target.value);
	}

	function saveOrUpdateCategory(e) {
		e.preventDefault();

		if(validateForm()){

			const category = {descripcion, estado}
			console.log(category);

			if(id){
				updateCategory(id, category).then((response) => {
					console.log(response.data)
					navigator('/category')
				}).catch(error => {
					console.error(error);
				})
			}else {
				createCategory(category).then((response) => {
					console.log(response.data);
					navigator('/category')
				}).catch(error => {
					console.error(error);
				})
			}
		} 

	}


	function validateForm() {
		let valid = true;

		const errorsCopy = {... errors}

		if(descripcion.trim()){
			errorsCopy.descripcion = '';
		} else {
			errorsCopy.descripcion = 'Description is required';
			valid = false; 
		}

		if(estado.trim()){
			errorsCopy.estado = '';
		} else {
			errorsCopy.estado = 'State is required';
			valid = false; 
		}

		setErrors(errorsCopy)

		return valid;
	}

	function pageTitle() {
		if(id){
			return <h2 className='text-center'>Update Category</h2>	
		} else {
			return <h2 className='text-center'>Add Category</h2>	
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
								<label htmlFor="description" className="block text-gray-700 font-bold mb-2">
									Description:
								</label>
								<input
									type="text"
									placeholder="Enter Description"
									name="description"
									value={descripcion}
									className={`block w-full p-2 border ${errors.descripcion ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-opacity-50`}
									onChange={handleDescription}
								/>
								{errors.descripcion && <p className='text-red-500 text-sm mt-1'>{errors.descripcion}</p>}
							</div>

							<div className='mb-4'>
								<label htmlFor="estado" className="block text-gray-700 font-bold mb-2">
									State:
								</label>
								<input
									type="number"
									placeholder="Enter State"
									name="estado"
									value={estado}
									className={`block w-full p-2 border ${errors.estado ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-opacity-50`}
									onChange={handleState}
								/>
								{errors.estado && <p className='text-red-500 text-sm mt-1'>{errors.estado}</p>}
							</div>

							<button
								className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
								onClick={saveOrUpdateCategory}
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CategoryComponent;
