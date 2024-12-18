import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './App.jsx'
import './index.css'
import Layout from './Layout.jsx'
import SignupPage from './signup.jsx'
import { Home } from './home.jsx'



const router = createBrowserRouter([{
  path: '/',
  element: <Layout />,
  children: [{
    path: "",
    element: <LoginPage />,
  },
   {
    path: "/signup",
    element: <SignupPage />,
  },
   {
    path: "/home",
    element: <Home/>,
  },
]
}])
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
