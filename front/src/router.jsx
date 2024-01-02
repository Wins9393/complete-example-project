import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import { ErrorPage } from "./containers/errorPage/ErrorPage.jsx";
import { LoginPage } from "./containers/loginPage/LoginPage.jsx";
import { RegisterPage } from "./containers/registerPage/RegisterPage.jsx";
import { UsersPage } from "./containers/usersPage/UsersPage.jsx";
import { AccountPage } from "./containers/accountPage/AccountPage.jsx";

export const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        // { index: true, element: <LoginPage /> },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/account",
          element: <AccountPage />,
        },
        {
          path: "/users",
          element: <UsersPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
