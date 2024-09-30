import react, { useEffect, useState } from 'react';
import { createCategory, getCategory, updateCategory } from '../services/categoryService';
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
		<div className= 'container'>
			<div className="row">
				<div className="card">
					{
						pageTitle()
					}
					<div className="card-body">
						<form action="" >
							<div className='form-group mb-2'>
								<label htmlFor="" className="form-label">Desciption:</label>
								<input type="text" placeholder='Enter Description:' name='description' value={descripcion} className={`form-control ${errors.descripcion ? 'is-invalid': ''}`} onChange={handleDescription}/>
								{errors.descripcion && <div className='invalid-feedback'>{errors.descripcion}</div>}
							</div>


							<div className='form-group mb-2'>
								<label htmlFor="" className="form-label">State:</label>
								<input type="number" placeholder='Enter State:' name='estado' value={estado} className={`form-control ${errors.estado ? 'is-invalid': ''}`} onChange={handleState}/>
								{errors.estado && <div className='invalid-feedback'>{errors.estado}</div>}
							</div>

							<button className='btn btn-success'onClick={saveOrUpdateCategory}>Submit</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CategoryComponent
