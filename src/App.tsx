
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './Modules/Home/home'
import NotFound from './Modules/NotFound/notFound'
import Login from './Modules/AuthModule/Login/login'
import Redirect from './Modules/AuthModule/redirect/redirect'
import MasterLayOut from './Modules/MasterLayOut/MasterLayOut'

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
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={routers}/>
    </>
  )
}

export default App
