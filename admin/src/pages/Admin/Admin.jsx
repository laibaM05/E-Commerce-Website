import React from 'react'
import './admin.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Addproduct from '../../components/Addproduct/Addproduct'
import Listproduct from '../../components/Listproduct/Listproduct'

const Admin = () => {
  return (
    <div className='admin'>
        <Sidebar/>
        <Routes>
            <Route path='/admin/addproduct' element={<Addproduct/>}/>
            <Route path='/admin/listproduct' element={<Listproduct/>}/>
        </Routes>
    </div>
  )
}

export default Admin
