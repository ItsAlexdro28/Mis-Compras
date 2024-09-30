import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListCategoriesComponent from './components/listCategoriesComponent.jsx' 
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import CategoryComponent from './components/CategoryComponent.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
	  <BrowserRouter>
	  	<Routes>
			<Route path='/' element = {<ListCategoriesComponent />}></Route>
			<Route path='/category' element = {<ListCategoriesComponent />}></Route>
			<Route path='/add-category' element = {<CategoryComponent />}></Route>
			<Route path='/edit-category/:id' element = {<CategoryComponent />}></Route>

	  	</Routes>
	  </BrowserRouter>
    </>
  )
}

export default App
