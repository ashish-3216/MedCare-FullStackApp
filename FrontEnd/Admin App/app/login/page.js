"use client";
import React from "react";
import { useEffect } from "react";
import { useLogin } from "@/components/useAuthHook";
import LoginComponent from "@/components/LoginComponent";
import { useRouter } from "next/navigation";
const Login = () => {
  const router = useRouter();
  const { user } = useLogin();
  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user]);

  if (user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        Already Logged in, redirecting back to home page!
      </div>
    );
  }
  return <LoginComponent />;
};

export default Login;
