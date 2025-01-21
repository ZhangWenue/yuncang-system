import { createBrowserRouter, BrowserRouter, Router, Route, RouterProvider } from 'react-router-dom'
import Layout from "./pages/Layout/Layout";
import Login from "./pages/Login/Login";
const router = createBrowserRouter([
  {
    path:'/login',
    element: <Login />
  },
  {
    path:'/layout',
    element: <Layout />
  },
])

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
