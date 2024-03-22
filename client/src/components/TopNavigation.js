import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

function TopNavigation() {
  let navigate = useNavigate();
  let storeObject = useSelector((store) => {
    return store;
  });

  useEffect(() => {
    if (storeObject.userDetails.email) {
    } else {
      navigate("/");
    }
  }, []);
  return (
    <nav>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/tasks">Tasks</NavLink>
      <NavLink to="/leaves">Leaves</NavLink>
      <NavLink to="/editProfile">EditProfile</NavLink>
      <NavLink to="/" onClick={()=>{
        localStorage.clear();
      }}>Logout</NavLink>
    </nav>
  );
}

export default TopNavigation;
