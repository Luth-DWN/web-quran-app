import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import ErrorPage from "./pages/ErrorPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ListTafsir from "./pages/LIstTafsir";
import ListSurah from "./pages/ListSurah";
import DetailSurah from "./pages/DetailSurah";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/list-surah",
    element: <ListSurah />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/list-tafsir",
    element: <ListTafsir />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/list-surah/:id",
    element: <DetailSurah />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
