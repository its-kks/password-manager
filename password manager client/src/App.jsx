import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import {Login} from './Login'
import {Signup} from './Signup'
import {Passwords} from './Passwords'

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/passwords",
    element: <Passwords />
  }
]);

function App(){
  return (
    <div >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;