import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Layout from "./components/layout/layout";
import { APP_ROUTES } from './appRoutes';
import List from "./pages/list";
import Detail from "./pages/detail";
import { Global } from "@emotion/react";

function App() {

  return (
    <>
      <Global
        styles={{
          'body': {
            margin: 0,
          },
        }}
      />
      <Routes>
        <Route key='1' path={APP_ROUTES.LIST} element={<Layout><List /></Layout>} />
        <Route key='2' path={APP_ROUTES.ASSETS_DETAIL} element={<Layout><Detail /></Layout>} />
        <Route key='3' path={APP_ROUTES.NOT_FOUND} element={<>Not Found</>} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;