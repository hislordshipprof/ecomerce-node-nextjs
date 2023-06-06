import React, { useEffect } from "react";
// import { useSelector } from 'react-redux';
import { useRouter } from "next/router";
import LoginPage from "@/components/Register/LoginPage";
const Login = () => {
  const router = useRouter();
  // const { isAuthenticated } = useSelector((state) => state.user);

  // useEffect(() => {
  //   if(isAuthenticated === true){
  //     router.push("/");
  //   }
  // }, [])

  return (
    <div>
      <LoginPage />
    </div>
  );
};

export default Login;
