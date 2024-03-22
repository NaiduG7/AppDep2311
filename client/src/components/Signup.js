import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let mobileNoInputRef = useRef();
  let passwordInputRef = useRef();
  let profilePicInputRef = useRef();

  let [profilePic,setProfilePic]= useState("./images/noimage.png");

  let onSignup = async () => {
    
    let dataToSend = {
      firstName: firstNameInputRef.current.value,
      lastName: lastNameInputRef.current.value,
      age: ageInputRef.current.value,
      email: emailInputRef.current.value,
      mobileNo: mobileNoInputRef.current.value,
      password: passwordInputRef.current.value,
      profilePic: profilePicInputRef.current.value,
    };

    console.log(dataToSend);

    let myHeader = new Headers();
    myHeader.append("Content-type", "application/json");

    let reqOptions = {
      method: "POST",
      body: JSON.stringify(dataToSend),
      // stringify means add quotes to keys
      // JSON.stringify is converts javaScript object to JSON
      headers: myHeader,
    };

    let JSONData = await fetch("/signup", reqOptions);

    let JSOData = await JSONData.json();
    // JSONData.json() is converts JSON to JavaScript
    console.log(JSOData);
  };

  let onSignupUsingURLE = async () => {
    let dataToSend = new URLSearchParams();

    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("mobileNo", mobileNoInputRef.current.value);
    dataToSend.append("profilePic", profilePicInputRef.current.value);

    let myHeader = new Headers();
    myHeader.append("content-type", "application/x-www-form-urlencoded");

    let reqOptions = {
      method: "POST",
      body: dataToSend,
      headers: myHeader,
    };
    let JSONData = await fetch("/signup", reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);
  };

  let onSignupUsingFD = async () => {
    let dataToSend = new FormData();

    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("mobileNo", mobileNoInputRef.current.value);

for(let i=0 ; i<profilePicInputRef.current.files.length;i++){

  dataToSend.append("profilePic", profilePicInputRef.current.files[i]);

}



    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };
    let JSONData = await fetch("/signup", reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData);
  };

  return (
    <div>
      <form>
        <h1>Signup</h1>
        <div>
          <label>First Name</label>
          <input ref={firstNameInputRef}></input>
        </div>
        <div>
          <label>Last Name</label>
          <input ref={lastNameInputRef}></input>
        </div>
        <div>
          <label>Age</label>
          <input ref={ageInputRef}></input>
        </div>
        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
        <div>
          <label>Mobile No.</label>
          <input ref={mobileNoInputRef}></input>
        </div>
        <div>
          <label>Profile Pic</label>
          <input  type="file" ref={profilePicInputRef} onChange={(eventObject)=>{

            let selectedFileURL = URL.createObjectURL(eventObject.target.files[0]);

            setProfilePic(selectedFileURL);
            

          }}></input>
        </div>

        <div>
          <img style={{width:"200px",height:"200px",objectFit:"contain"}} src={profilePic} alt=""></img>
        </div>

        <div>
          <button
            type="button"
            onClick={() => {
              onSignup();
            }}
          >
            Sign Up(JSON)
          </button>
          <button
            type="button"
            onClick={() => {
              onSignupUsingURLE();
            }}
          >
            Sign Up(URLEncoded)
          </button>

          <button
            type="button"
            onClick={() => {
              onSignupUsingFD();
            }}
          >
            Sign Up(FD)
          </button>
        </div>
        <Link to="/">Login</Link>
      </form>
    </div>
  );
}

export default Signup;
