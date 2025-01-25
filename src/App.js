import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from "./pages/Layout/Layout";
import Login from "./pages/Login/Login";
import Role from './pages/Role/role';
import Admin from './pages/Admin/admin';
import Mine from './pages/Admin/Mine/Mine';

const router = createBrowserRouter([
  {
    path:'/login',
    element: <Login />
  },
  {
    path:'/layout',
    element: <Layout />,
    children: [
      {
        path: 'role',
        element: <Role />
      },
      {
        path: 'admin',
        element: <Admin />
      },
      {
        path: 'mine',
        element: <Mine />
      },
    ]
  },
])

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
