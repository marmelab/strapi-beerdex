import React from "react";
import "antd/dist/antd.css";
import "isomorphic-unfetch";
import { SWRConfig } from "swr";

import "./index.css";
import { AuthProvider } from "../auth/AuthContext";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const CustomApp = ({ Component, pageProps }) => (
  <SWRConfig value={{ fetcher }}>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </SWRConfig>
);

export default CustomApp;
