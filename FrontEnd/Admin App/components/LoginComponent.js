"use client";
import React, { useState, useEffect } from "react";
import styles from "../styles/LoginPage.module.css";
import Image from "next/image";
import Input_component from "./Input_component";
import Button_component from "./Button_component";
import { useRouter } from "next/navigation";
import { useLogin } from "@/components/useAuthHook";
import { toast } from "react-toastify";
const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { fetchUser, user, logout } = useLogin();

  const handleLogin = async () => {
    try {
      
      if (!email || !password) {
        return toast.info("Please provide both email and password.");
      }
      if (!email.includes("admin")) {
        return toast.info("Currently, we only allow admin email");
      }
      const res = await fetch(`http://localhost:5000/api/v1/auth/login`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ 
          email, 
          password, 
          AdminFlag: true // This will now be accessible in the strategy
        }),
      });

      const result = await res.json();

      if (res.ok) {
        await fetchUser();
        toast.success("Login successful");
        router.push("/doctor/appointment");
      } else {
        toast.error(result.message || "incorrect crendtials or not an admin");
      }
    } catch (err) {
      toast.error("Login error:", err);
    }
  };
  const handleReset = () => {
    setEmail("");
    setPassword("");
    toast.success("Reset Successful");
  };

  return (
    <div className={styles.login}>
      <Image
        src={"./login.svg"}
        layout="fill"
        alt="login"
        height={0}
        width={0}
        className={styles.login_image}
      />
      <div className={styles.fields}>
        <div className={styles["login-type"]}>
          <h6>Admin Login</h6>
        </div>
        <section className={styles.login_section}>
          <Input_component
            LabelName="Email"
            color="rgba(28, 74, 42, 1)"
            input_type="email"
            img_url="/At sign.png"
            placeholder_name="example@123.com"
            value={email}
            setValue={setEmail}
          />
          <Input_component
            LabelName="Password"
            color="rgba(28, 74, 42, 1)"
            input_type="password"
            img_url="/Lock.svg"
            placeholder_name="Enter Your Password"
            isPasswordFlag={true}
            value={password}
            setValue={setPassword}
          />
          <Button_component
            text="Login"
            color="#1C4A2A"
            onClick={() => handleLogin()}
            disabled={true}
          />
          <Button_component
            text="Reset"
            color="#C6B09A"
            onClick={handleReset}
            disabled={false}
          />
          <a href="#">
            <p className={styles.forgot}>Forgot Password ?</p>
          </a>
        </section>
      </div>
    </div>
  );
};

export default LoginComponent;
