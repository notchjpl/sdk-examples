import React from "react";
import { Route, Routes } from "react-router-dom";

// components
import { Layout } from "./Layout";

// pages
import { Error } from "@pages";

// utils
import { routes } from "@utils";

export function App() {
  return (
    <Routes>
      {routes.map((route, index) => {
        return (
          <Route
            element={
              <Layout>
                <route.component />
              </Layout>
            }
            key={index}
            path={route.path}
          />
        );
      })}
      <Route
        element={
          <Layout>
            <Error />
          </Layout>
        }
        exact
        path="*"
      />
    </Routes>
  );
}

export default App;
