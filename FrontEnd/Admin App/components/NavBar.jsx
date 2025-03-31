
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/NavBar.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogin } from "@/components/useAuthHook";
import { usePathname } from "next/navigation";
const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { user, logout, fetchUser } = useLogin();
  const pathname = usePathname();
  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false); // Close menu on logout
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.leftDiv}>
        <div className={styles.logo}>
          <div className={styles.Frame}>
            <Image
              className={styles.trust}
              src="/medcare_logo.png"
              width={20}
              height={20}
              alt="Logo"
            />
          </div>
          <div className={styles.name}>
            <p>MedCare</p>
          </div>
        </div>

        <div
          className={`${styles["nav-links"]} ${
            isMenuOpen ? styles.active : ""
          }`}
        >
          <div className={styles.links}>
            <ul>
              <Link href="/" onClick={closeMenu}>
                <li
                  id={pathname === "/" ? styles.activeLink : styles.home}
                >
                  Home
                </li>
              </Link>


              <Link href="/doctor/appointment" onClick={closeMenu}>
                <li
                  id={
                    pathname === "/doctor/appointment" ? styles.activeLink : styles.appointments
                  }
                >
                  Appointments
                </li>
              </Link>
              <Link href="/doctor" onClick={closeMenu}>
                <li
                  id={
                    pathname === "/doctor" ? styles.activeLink : styles.appointments
                  }
                >
                  Doctors
                </li>
              </Link>
              <Link href="/doctor/add">
              <li
                  id={
                    pathname === "/doctor/add" ? styles.activeLink : styles.appointments
                  }
                >
                  Add Doctor
                </li>
              </Link>
            </ul>
          </div>

          <div className={styles["mobile-nav-login"]}>
            <Link href="/login" onClick={closeMenu}>
              <button className={styles.login}>Login</button>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles["nav-login"]}>
        {user ? (
          <button className={styles.login} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link href="/login">
              <button className={styles.login}>Login</button>
            </Link>
          </>
        )}
      </div>

      <div className={styles.hamburger} onClick={toggleMenu}>
        <Image
          className={styles["menu-img"]}
          src={isMenuOpen ? "/close.png" : "/burger-bar.png"}
          alt="Hamburger-Menu"
          width={30}
          height={30}
        />
      </div>
    </div>
  );
};

export default NavBar;
