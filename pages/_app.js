import "../styles/globals.css";
import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";

import { useRouter } from "next/router";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router, setPageLoading]);
  return pageLoading ? <Loading /> : <Component {...pageProps} />;
};

export default MyApp;
