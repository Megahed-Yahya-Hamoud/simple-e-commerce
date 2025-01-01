import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
// import HomePage from "./pages/Home/HomePage";
import Favorite from "./pages/Favorite/Favorite";
import Header from "./Layout/Header/Header";
import { Box } from "@mantine/core";
import Loading from "./Layout/loader/Loading";
import Payment from "./pages/Payment/Payment";
const LazyLoading = React.lazy(() => import("./pages/Home/HomePage"));

function App() {
  return (
    <Box>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense fallback={<Loading/>}>
              <LazyLoading />
            </React.Suspense>
          }
        />
        <Route path="/favorite" Component={Favorite} />
        <Route path="/payment" Component={Payment} />
      </Routes>
    </Box>
  );
}

export default App;
