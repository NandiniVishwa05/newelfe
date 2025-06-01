import LoginPage from "./Pages/LoginPage"
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import ListPage from './Pages/ListPage'
import AddEditPage from './Pages/AddEditPage'

function App() {
  return (
    <>
      <ToastContainer closeButton={false} position="top-right" autoClose={3000} />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/listpage' element={<ListPage />} />
          <Route path='/addeditpage' element={<AddEditPage />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
