/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import { signOut } from "next-auth/react";

import { loadUser } from "../../redux/actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.loadedUser);

  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    }
  }, [dispatch, user]);

  const logoutHandler = () => {
    signOut();
  };

  return (
    <nav className="navbar row justify-content-center sticky-top">
      <div className="container">
        <div className="col-3 p-0">
          <div className="navbar-brand">
            <Link href="/">
              <img
                style={{ cursor: "pointer" }}
                src="/images/bookit_logo.png"
                alt="BookIT"
              />
            </Link>
          </div>
        </div>

        <div className="col-3 mt-3 mt-md-0 text-center">
          {user ? (
            <div className="ml-4 dropdown d-line">
              <a
                className="btn dropdown-toggle mr-4"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.name}</span>
              </a>

              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user.role === "admin" && (
                  <>
                    <Link href="/admin/rooms" className="dropdown-item">
                      Rooms
                    </Link>

                    <Link href="/admin/bookings" className="dropdown-item">
                      Bookings
                    </Link>

                    <Link href="/admin/users" className="dropdown-item">
                      Users
                    </Link>

                    <Link href="/admin/reviews" className="dropdown-item">
                      Reviews
                    </Link>

                    <hr />
                  </>
                )}
                <Link href="/bookings/me" className="dropdown-item">
                  My Bookings
                </Link>
                <Link href="/me/update" className="dropdown-item">
                  Profile
                </Link>
                <Link
                  href="/"
                  className="dropdown-item text-danger"
                  onClick={logoutHandler}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link
                href="/login"
                className="btn btn-danger px-4 text-white login-header-btn float-right"
              >
                Login
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
