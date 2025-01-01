import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import Style from "./dashboard.module.css";
import userImage from "@/public/user.png";
import EditImage from "@/public/pencile.png";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null); // برای نگهداری userId استخراج‌شده
  const router = useRouter();

  useEffect(() => {
    // تابع برای استخراج اطلاعات از توکن
    function parseJwt(token) {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        return JSON.parse(jsonPayload);
      } catch (error) {
        console.error("Invalid token:", error);
        return null;
      }
    }

    const token = localStorage.getItem("token"); // دریافت توکن از localStorage

    if (!token) {
      router.push("/auth/login"); // هدایت به صفحه ورود در صورت عدم وجود توکن
      return;
    }

    // بررسی توکن و استخراج اطلاعات
    const decoded = parseJwt(token);
    if (decoded && decoded.userId) {
      setUserId(decoded.userId); // ذخیره userId استخراج‌شده
    } else {
      console.error("Invalid token or missing userId");
    }

    // فراخوانی API برای دریافت اطلاعات کاربر
    fetch("/api/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data); // ذخیره اطلاعات کاربر
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [router]);

  // نمایش پیام بارگذاری تا اطلاعات کاربر دریافت شود
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="main">
        <h2 className={Style.text_header}>Dashboard</h2>
        <div className={Style.Dashboard_Container}>
          <div className={Style.left_section}>
            <div className={Style.button_container}>
              <button>Delete Account</button>
              <button>View Transactions</button>
              <button>View Invoices</button>
              <button>View Orders</button>
              <button>View Messages</button>
              <button>View Notifications</button>
              <button>View Settings</button>
            </div>
          </div>
          <div className={Style.right_section}>
            <div className={Style.header_profile}>
              <div className={Style.image_container}>
                {/* تصویر پروفایل کاربر */}
                <Image 
                  src={user.imageProfile? user.imageProfile : userImage}
                  width={100}
                  height={100}

                />
                <input type="file" />

              </div>
              <p>{user.username}</p>
              <Link href="/dashboard/editProfile">
                <Image
                  src={EditImage}
                  width={30}
                  height={30}
                />
              </Link>
            </div>
            <div className={Style.info_container}>
              {/* نمایش اطلاعات کاربر به صورت داینامیک */}
              <h5>Firstname: {user.firstname}</h5>
              <h5>Email: {user.email}</h5>
              <h5>User ID: {userId}</h5> {/* نمایش userId استخراج‌شده */}
              <h5>{user.city}</h5>
              <h5>{user.state}</h5>
              <h5></h5>
              <h5></h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
