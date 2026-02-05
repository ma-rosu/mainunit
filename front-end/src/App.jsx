import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import './App.css'
import HomePage from '../pages/HomePage'
import RadioPage from '../pages/RadioPage'
import Layout from "./Layout";

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/radio',
        element: <RadioPage />
      }
    ]
  }
]

const router = createBrowserRouter(routes);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
