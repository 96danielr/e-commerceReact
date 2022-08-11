
import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import {Home,Login,ProductDetail,Purchases} from './pages'
import {LoadingScreen, NavBar, ProtectedRoutes} from "./components"
import { useSelector } from 'react-redux/es/exports'
import {Container} from 'react-bootstrap'


function App() {

  const isLoading = useSelector(state => state.isLoading)
  

  return (
    <div className="App">
      <HashRouter>
        <NavBar />
        {isLoading && <LoadingScreen />}  
        <Container className="mt-5">
        <Routes>
          <Route  path='/' element={<Home />}/>
          <Route  path='/detail/:id' element={<ProductDetail />}/>
          <Route  path='/login' element={<Login />}/>
        

          <Route element={<ProtectedRoutes />}>

          <Route  path='/purchases' element={<Purchases />}/>
          </Route>
        </Routes>
        </Container>
      </HashRouter>

    
    </div>
  )
}

export default App
