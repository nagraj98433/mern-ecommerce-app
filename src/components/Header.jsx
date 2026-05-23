import React from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/userSlice";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FaShoppingBag } from "react-icons/fa";

function Header() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { userInfo } = useSelector((state) => state.user);

  const cartItems = useSelector((state) => state.cart.cartItems);

  const logoutHandler = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
  };

  return (
    <header className="sticky top-0 z-50 bg-black text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 font-bold">
          {/* MOBILE ICON */}

          <div className="block text-3xl text-yellow-400 md:hidden">
            <FaShoppingBag />
          </div>

          {/* DESKTOP TEXT */}

          <div className="hidden text-3xl tracking-wide md:block">
            ShopSphere
          </div>
        </Link>
        {/* NAV LINKS */}

        <nav className="hidden items-center gap-10 text-lg md:flex">
          <Link
            to="/"
            className={`hover:text-yellow-400 ${
              location.pathname === "/" ? "text-yellow-400" : ""
            } `}
          >
            Home
          </Link>

          <Link
            to="/products"
            className={`hover:text-yellow-400 ${
              location.pathname.includes("/products") ? "text-yellow-400" : ""
            } `}
          >
            Products
          </Link>

          <Link
            to="/categories"
            className={`hover:text-yellow-400 ${
              location.pathname.includes("/categories") ? "text-yellow-400" : ""
            } `}
          >
            Categories
          </Link>
        </nav>

        {/* RIGHT */}

        <div className="flex items-center gap-6">
          {/* CART */}

          <Link to="/cart" className="relative text-2xl">
            <FaShoppingBag />

            {cartItems.length > 0 && (
              <span className="absolute -top-3 -right-3 rounded-full bg-yellow-400 px-2 py-1 text-xs font-bold text-black">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* USER */}

          {userInfo ? (
            <div className="flex items-center gap-3">
              <FaUser />

              <span>{userInfo.name}</span>

              <button
                onClick={logoutHandler}
                className="cursor-pointer rounded-xl bg-red-500 px-4 py-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login">Login</Link>

              <Link
                to="/register"
                className="rounded-xl bg-yellow-400 px-5 py-2 font-semibold text-black"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
