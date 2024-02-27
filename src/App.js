import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { ProductContext } from "./ProductContext";

// all the pages and component to render
import Nav from "./Component/Navbar/Nav";
import LandingPage from "./Pages/LandingPage";
import { Home } from "./Pages/Home";
import {MyOrder} from "./Pages/MyOrder";
import {Cart} from "./Pages/Cart";
import {SignIn} from "./Pages/SignIn";
import { SignUp } from "./Pages/SignUp";
import { Error } from "./Pages/Error";

function App() {

  const router = createBrowserRouter([
    {
      path:"/", 
      element: <Nav />,
      errorElement: <Error />,
      children:[
        { index : true, element: <LandingPage />},
        { path:"/home", element: <Home />},
        { path:"/myorder", element: <MyOrder />},
        { path:"/cart", element: <Cart />},
        { path:"/signin", element: <SignIn />},
        { path:"/signup", element: <SignUp />},
      ]
    }
  ]);

  return (
    <>
      <AuthContext>
        <ProductContext>
          <RouterProvider router={router} />    
        </ProductContext>
      </AuthContext>
    </>
  );
}

export default App;

