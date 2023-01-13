import React, { useEffect, useState } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";

// components
import { Layout } from "./Layout";

// pages
import { Error } from "@pages";

// utils
import { routes } from "@utils";

// context
import { setInteractiveParams, useGlobalDispatch } from "@context";
import { setupBackendAPI } from "../utils/backendApi";

export function App() {
  const [searchParams] = useSearchParams();
  const [hasInitBackendAPI, setHasInitBackendAPI] = useState(false);

  // context
  const globalDispatch = useGlobalDispatch();

  useEffect(() => {
    const interactiveParams = {
      assetId: searchParams.get("assetId"),
      interactiveNonce: searchParams.get("interactiveNonce"),
      interactivePublicKey: searchParams.get("interactivePublicKey"),
      playerId: searchParams.get("playerId"),
      url: searchParams.get("url"),
      urlSlug: searchParams.get("url"),
    };

    if (interactiveParams.assetId)
      setInteractiveParams({
        dispatch: globalDispatch,
        ...interactiveParams,
      });

    const setupAPI = async () => {
      await setupBackendAPI(interactiveParams);
      setHasInitBackendAPI(true);
    };
    if (!hasInitBackendAPI) setupAPI();
  }, [globalDispatch, hasInitBackendAPI, searchParams]);

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
