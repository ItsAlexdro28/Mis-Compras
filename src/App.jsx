import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListCategoriesComponent from './components/listCategoriesComponent.jsx' 
import ListClientsComponent from './components/ListClientsComponent.jsx' 
import ListSaleComponent from './components/ListSaleComponent.jsx'
import ListSalesProductsComponent from './components/ListSalesProductsComponent.jsx'
import ListProductComponent from './components/ListProductComponent.jsx'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import CategoryComponent from './components/CategoryComponent.jsx'
import ClientComponent from './components/ClientComponent.jsx'
import SaleComponent from './components/SaleComponent.jsx'
import SalesProductsComponent from './components/SalesProductsComponent.jsx'
import ProductComponent from './components/ProductComponent.jsx'
import Menu from './Menu.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
	  <BrowserRouter>
	  	<Routes>
			<Route path='/' element = {<Menu />}></Route>
			<Route path='/category' element = {<ListCategoriesComponent />}></Route>
			<Route path='/add-category' element = {<CategoryComponent />}></Route>
			<Route path='/edit-category/:id' element = {<CategoryComponent />}></Route>
			<Route path='/client' element = {<ListClientsComponent />}></Route>
			<Route path='/add-client' element = {<ClientComponent />}></Route>
			<Route path='/edit-client/:id' element = {<ClientComponent />}></Route>
			<Route path='/sale' element = {<ListSaleComponent />}></Route>
			<Route path='/add-sale' element = {<SaleComponent />}></Route>
			<Route path='/edit-sale/:id' element = {<SaleComponent />}></Route>
			<Route path='/product' element = {<ListProductComponent />}></Route>
			<Route path='/add-product' element = {<ProductComponent />}></Route>
			<Route path='/edit-product/:id' element = {<ProductComponent />}></Route>
			<Route path='/sales-products' element = {<ListSalesProductsComponent />}></Route>
			<Route path='/add-sales-products' element = {<SalesProductsComponent />}></Route>
			<Route path='/edit-sales-products/:id' element = {<SalesProductsComponent />}></Route>
	  	</Routes>
	  </BrowserRouter>

    </>
  )
}

export default App
