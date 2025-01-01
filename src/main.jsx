import  { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';
import { BrowserRouter } from "react-router-dom";
import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";
import Loading from "./Layout/loader/Loading.jsx";
const LazyLoading=React.lazy(()=>import("./App.jsx"))

const theme = createTheme({});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <Notifications position="top-center" zIndex={100000000}/>
      <BrowserRouter>
      <React.Suspense fallback={<Loading/>}>
        <LazyLoading />
      </React.Suspense>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
);
