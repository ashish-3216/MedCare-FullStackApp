"use client"
import Image from "next/image";
import styles from "../styles/landingpage.module.css";
import Link from "next/link";
import { useLogin } from "@/components/useAuthHook";
export default function LandingPage() {
  const {user} = useLogin();
  return (
    <div className={styles.container}>
      {/* left */}
      <div className={styles["landing-text"]}>
        {/* text content */}
        <div>
          <h2>Admin Portal</h2>
          <p>
          Health in Your Hands. 
          MedCare
          </p>
        </div>
        {/* button  */}
        <Link href={user ? '/doctor/appointment' : '/login'}>
          <button className={styles.startbtn}>Get Started</button>
        </Link>
      </div>
      {/* right */}
      <div className={styles.right}>
        <Image
        src={'./homeImage.svg'}
        alt="landing image"
        fill
        className={styles.landing_img}
        />
      </div>
    </div>
  );
}
