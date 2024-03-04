import { useState, useEffect } from "react";

function Header() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      let userStorage = JSON.parse(localStorage.getItem("user"));
      setUser(userStorage);
    }
  }, []);

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  return (
    <div className="navbar bg-gradient-to-r from-cyan-500 via-cyan-600 to-blue-800 px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <a
          className="link link-hover flex flex-row gap-2 justify-center items-center  rounded-full p-2 text-white"
          href="/"
        >
          <img src="/assets/logo.png" className="w-20" alt="" />
        </a>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal text-white text-lg">
          {(user ? user.position == "teacher" : false) && (
            <li>
              <a className="text-cyan-200 hover:text-cyan-50" href="/teach">
                คอร์สของฉัน
              </a>
            </li>
          )}
          {(user ? user.position == "student" : false) && (
            <li>
              <a className="text-cyan-200 hover:text-cyan-50" href="">
                เข้าเรียน
              </a>
            </li>
          )}
          <li>
            <a href="">คลังข้อสอบ</a>
          </li>
          <li>
            <a href="">คอร์สทั้งหมด</a>
          </li>
        </ul>
        {!user && (
          <a className="btn btn-neutral rounded-full" href="/login">
            <svg
              fill="currentColor"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4ZM6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8ZM8 18C6.34315 18 5 19.3431 5 21C5 21.5523 4.55228 22 4 22C3.44772 22 3 21.5523 3 21C3 18.2386 5.23858 16 8 16H16C18.7614 16 21 18.2386 21 21C21 21.5523 20.5523 22 20 22C19.4477 22 19 21.5523 19 21C19 19.3431 17.6569 18 16 18H8Z"
              />{" "}
            </svg>
            เข้าสู่ระบบ
          </a>
        )}
        {user && (
          <div className="drawer-end z-50">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label
                htmlFor="my-drawer-4"
                className="drawer-button btn btn-neutral font-bold rounded-full"
              >
                {user.nickName}
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                <li>
                  <a className="link link-hover p-3" href="/profile">
                    แก้ไขโปรไฟล์
                  </a>
                </li>
                <li>
                  <a
                    className="btn bg-red-700 text-white"
                    onClick={() => logout()}
                  >
                    log out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
