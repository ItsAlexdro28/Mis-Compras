import react, { useEffect, useState } from 'react';
import { createProduct, getProduct, updateProduct } from '../services/ProductService';
import { useNavigate, useParams } from 'react-router-dom';

const ProductComponent = () => {

	const [nombre, setNombre] = useState('')
	const [idCategoria, setIdCategoria] = useState('')	
	const [codigoBarras, setCodigoBarras] = useState('')	
	const [precioVenta, setPrecioVenta] = useState('')	
	const [cantidadStock, setCantidadStock] = useState('')	
	const [estado, setEstado] = useState('')	

	const {id} = useParams();
	const [error, setErrors] = useState({
		nombre: '',
		idCategoria:'',
		codigoBarras: '',
		precioVenta: '',
		cantidadStock: '',
		estado: ''
	})

	const navigator = useNavigate();

	useEffect(() => {
	
		if(id){
			getProduct(id).then((response) => {
				setNombre(response.data.nombre);
				setIdCategoria(response.data.idCategoria)
				setCodigoBarras(response.data.codigoBarras)
				setPrecioVenta(response.data.precioVenta)
				setCantidadStock(response.data.cantidadStock)
				setEstado(response.data.estado)
			}).catch(error => {
				console.error(error)
			})
		}

	}, [id])

	function handleNombre (e) {
		setNombre(e.target.value);
	}
	
	function handleIdCategoria (e) {
		setIdCategoria(e.target.value);
	}

	function handleCodigoBarras (e) {
		setCodigoBarras(e.target.value);
	}

	function handlePrecioVenta (e) {
		setPrecioVenta(e.target.value);
	}

	function handleCantidadStock (e) {
		setCantidadStock(e.target.value);
	}

	function handleEstado (e) {
		setEstado(e.target.value);
	}

	function saveOrUpdateProduct(e) {
		e.preventDefault();

		if(validateForm()){

			const product = {nombre, idCategoria, codigoBarras, precioVenta, cantidadStock, estado}
			console.log(product);

			if(id){
				updateProduct(id, product).then((response) => {
					console.log(response.data)
					navigator('/product')
				}).catch(error => {
					console.error(error);
				})
			} else {
				createProduct(product).then((response) => {
					console.log(response.data);
					navigator('/product')
				}).catch(error => {
					console.error(error);
				})
			}
		}

	}

	function validateForm() {
		let valid = true;

		const errorCopy = {... error}

		if(nombre.trim()){
			errorCopy.nombre = '';
		} else {
			errorCopy.nombre = 'Nombre is required';
			valid = false;
		}

		if(idCategoria.trim()){
			errorCopy.idCategoria = '';
		} else {
			errorCopy.idCategoria = 'ID categoria is required';
			valid = false;
		}

		if(codigoBarras.trim()){
			errorCopy.codigoBarras = '';
		} else {
			errorCopy.codigoBarras = 'Codigo de barras is required';
			valid = false;
		}

		if(precioVenta.trim()){
			errorCopy.precioVenta = '';
		} else {
			errorCopy.precioVenta = 'Precio venta is required';
			valid = false;
		}

		if(cantidadStock.trim()){
			errorCopy.cantidadStock = '';
		} else {
			errorCopy.cantidadStock = 'Cantidad de estock is required';
			valid = false;
		}

		if(estado.trim()){
			errorCopy.estado = '';
		} else {
			errorCopy.estado = 'estado is required';
			valid = false;
		}

		setErrors(errorCopy)

		return valid

	}

	function pageTitle() {
		if(id){
			return <h2 className='text-center'>Update Product</h2>	
		} else {
			return <h2 className='text-center'>Add Product</h2>	
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
								<label htmlFor="nombre" className="block text-gray-700 font-bold mb-2">
									Nombre:
								</label>
								<input
									type="text"
									placeholder="Enter Nombre"
									name="nombre"
									value={nombre}
									className={`block w-full p-2 border ${error.nombre ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-opacity-50`}
									onChange={handleNombre}
								/>
								{error.nombre && <p className='text-red-500 text-sm mt-1'>{error.nombre}</p>}
							</div>

							<div className='mb-4'>
								<label htmlFor="idCategoria" className="block text-gray-700 font-bold mb-2">
									Id Categoria:
								</label>
								<input
									type="text"
									placeholder="Enter Id Categoria"
									name="idCategoria"
									value={idCategoria}
									className={`block w-full p-2 border ${error.idCategoria ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-opacity-50`}
									onChange={handleIdCategoria}
								/>
								{error.idCategoria && <p className='text-red-500 text-sm mt-1'>{error.idCategoria}</p>}
							</div>

							<div className='mb-4'>
								<label htmlFor="codigoBarras" className="block text-gray-700 font-bold mb-2">
									Codigo Barras:
								</label>
								<input
									type="text"
									placeholder="Enter Codigo Barras"
									name="codigoBarras"
									value={codigoBarras}
									className={`block w-full p-2 border ${error.codigoBarras ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-opacity-50`}
									onChange={handleCodigoBarras}
								/>
								{error.codigoBarras && <p className='text-red-500 text-sm mt-1'>{error.codigoBarras}</p>}
							</div>

							<div className='mb-4'>
								<label htmlFor="precioVenta" className="block text-gray-700 font-bold mb-2">
									Precio Venta:
								</label>
								<input
									type="text"
									placeholder="Enter Precio Venta"
									name="precioVenta"
									value={precioVenta}
									className={`block w-full p-2 border ${error.precioVenta ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-opacity-50`}
									onChange={handlePrecioVenta}
								/>
								{error.precioVenta && <p className='text-red-500 text-sm mt-1'>{error.precioVenta}</p>}
							</div>

							<div className='mb-4'>
								<label htmlFor="cantidadStock" className="block text-gray-700 font-bold mb-2">
									Cantidad Stock:
								</label>
								<input
									type="text"
									placeholder="Enter Cantidad Stock"
									name="cantidadStock"
									value={cantidadStock}
									className={`block w-full p-2 border ${error.cantidadStock ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-opacity-50`}
									onChange={handleCantidadStock}
								/>
								{error.cantidadStock && <p className='text-red-500 text-sm mt-1'>{error.cantidadStock}</p>}
							</div>

							<div className='mb-4'>
								<label htmlFor="estado" className="block text-gray-700 font-bold mb-2">
									Estado:
								</label>
								<input
									type="text"
									placeholder="Enter Estado"
									name="estado"
									value={estado}
									className={`block w-full p-2 border ${error.estado ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-opacity-50`}
									onChange={handleEstado}
								/>
								{error.estado && <p className='text-red-500 text-sm mt-1'>{error.estado}</p>}
							</div>

							<button
								className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
								onClick={saveOrUpdateProduct}
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

export default ProductComponent;
