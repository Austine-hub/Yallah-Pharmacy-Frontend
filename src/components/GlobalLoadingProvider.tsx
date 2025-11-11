import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";

const GlobalLoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 800); // fake delay for smooth transition
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      {loading && <Loader />}
      {children}
    </>
  );
};

export default GlobalLoadingProvider;
