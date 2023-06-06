import SignUpPage from "@/components/Register/SignUpPage";
import React, { useEffect } from "react";
// import { useSelector } from 'react-redux';

const SignUp = () => {
  //   const { isAuthenticated } = useSelector((state) => state.user);

  //   useEffect(() => {
  //     if(isAuthenticated === true){
  //       navigate("/");
  //     }
  //   }, [])
  return (
    <div>
      <SignUpPage />
    </div>
  );
};

export default SignUp;
