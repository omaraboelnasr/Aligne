
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './Modules/Home/home'
import NotFound from './Modules/NotFound/notFound'
import Login from './Modules/AuthModule/Login/login'
import Redirect from './Modules/AuthModule/redirect/redirect'
import MasterLayOut from './Modules/MasterLayOut/MasterLayOut'
import Project from './Modules/projectModule/project'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const routers = createBrowserRouter([
    {
      path:'/',
      element:<MasterLayOut/>,
      errorElement:<NotFound/>,
      children:[
        {index:true,element:<Home/>},
        { path: "login", element: <Login /> },
        { path: "authRedirect", element: <Redirect/> },
        { path: "projects", element: <Project/> },
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={routers}/>
      <ToastContainer  position="top-center"/>
    </>
  )
}

export default App
