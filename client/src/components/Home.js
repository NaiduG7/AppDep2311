import React from "react";
import TopNavigation from "./TopNavigation";
import { useSelector } from "react-redux";

function Home() {
  let storeObject = useSelector((store) => {
    console.log(store);
    return store;
  });
  return (
    <div>
      <TopNavigation />
      <h1>Home</h1>
      <div className="details">
      <h2>{`${storeObject.userDetails.firstName} ${storeObject.userDetails.lastName}`}</h2>
      <img style={{width:"300px"}}  src={`/${storeObject.userDetails.profilePic}`}></img>
      <h2>Age:{`${storeObject.userDetails.age}`}</h2>
      <h2>MobileNo: {`${storeObject.userDetails.mobileNo}`}</h2>
      </div>
    </div>
  );
}

export default Home;
