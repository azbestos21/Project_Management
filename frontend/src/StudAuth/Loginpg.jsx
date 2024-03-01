import React from "react";
import { useState, useEffect } from "react";
import RNSIT from "../assets/RNSIT.jpg";
import { Carousel } from "antd";
import CSE from "../assets/CSE.jpeg";
import Backgimg from "../assets/Backgimg.jpg";
import { studentlogin, studentsignup, mentorlist } from "./Services/Api";
import { useNavigate } from "react-router-dom";

export default function Loginpg() {
  const [showSignIn, setShowSignIn] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setUseremail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsn] = useState();
  const [Name, setname] = useState();
  const [mentorName, setMentorName] = useState();
  const [Mlist, setMentorList] = useState();
  const navigate = useNavigate();
  console.log(email, password);
  const [confirmpassword, setconfirmPassword] = useState();
  console.log(username, Name, email, password, confirmpassword, mentorName);

  const [signInButtonStyle, setSignInButtonStyle] = useState({
    backgroundImage: "linear-gradient(to right, #6a11cb 0%, #ff4b2b 100%)",
  });
  const [signUpButtonStyle, setSignUpButtonStyle] = useState({
    backgroundColor: "slate",
  });
  const handleSignInclick = () => {
    setShowSignIn(true);
    setShowSignUp(false);
    setSignInButtonStyle({
      backgroundColor: "slate ",
      backgroundImage: "linear-gradient(to right, #6a11cb 0%, #ff4b2b 100%)",
    });
    setSignUpButtonStyle({ backgroundColor: "slate" });
  };
  const handleSignUpclick = () => {
    setShowSignUp(true);
    setShowSignIn(false);
    setSignInButtonStyle({ backgroundColor: "slate" });
    setSignUpButtonStyle({
      backgroundColor: "slate",
      backgroundImage: "linear-gradient(to right, #6a11cb 0%, #ff4b2b 100%)",
    });
  };
  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const data = await studentlogin({ username, password });
      console.log(data);
      localStorage.setItem("studenttoken", data.userData.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const data = await studentsignup({
        username,
        Name,
        password,
        confirmpassword,
        email,
        mentorName,
      });
      localStorage.setItem("studenttoken", data.userData.token);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const datafetch = async () => {
      try {
        const list = await mentorlist();
        console.log(list);
        setMentorList(list);
      } catch (error) {
        console.log(error);
      }
    };
    datafetch();
  }, []);
  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem("studenttoken");
    };
    handleLogout();
  }, []);
  return (
    <div className="w-full h-screen flex flex-row">
      <div className="w-1/2 h-screen flex flex-col justify-start items-center bg-slate-50">
        <h2 className="text-2xl text-center m-3">Student</h2>
        <div className="flex gap-3 my-5">
          <div className=" bg-slate-50 rounded-2xl">
            <button
              className="primary w-full h-full p-2 rounded-3xl text-wrap"
              onClick={handleSignInclick}
              style={signInButtonStyle}
            >
              SIGN IN
            </button>
          </div>
          <div className="rounded-4xl bg-slate-50">
            <button
              className="secondary w-full h-full p-2 rounded-3xl"
              onClick={handleSignUpclick}
              style={signUpButtonStyle}
            >
              SIGN UP
            </button>
          </div>
        </div>
        {showSignIn && (
          <div className="w-full">
            <form
              onSubmit={handlelogin}
              className="max-w-md mx-auto flex flex-col gap-8 p-3"
            >
              <input
                className="p-3 border-none"
                type="text"
                placeholder={"USN"}
                onChange={(e) => setUsn(e.target.value)}
              />
              <input
                className="p-3 border-none"
                type="password"
                placeholder={"password"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="bg-blue-300 p-3">Login</button>
            </form>
          </div>
        )}
        {showSignUp && (
          <div className="w-full">
            <form
              className="max-w-md mx-auto flex flex-col gap-2 p-3"
              onSubmit={handleSignup}
            >
              <input
                className="p-3 border-none"
                type="text"
                placeholder={"USN"}
                onChange={(e) => setUsn(e.target.value)}
              />
              <input
                className="p-3 border-none"
                type="text"
                placeholder={"Name"}
                onChange={(e) => setname(e.target.value)}
              />
              <input
                className="p-3 border-none"
                type="email"
                placeholder={"your@email.com"}
                onChange={(e) => setUseremail(e.target.value)}
              />
              <select
                className="p-3 border-none"
                type="text"
                placeholder={"Mentor_Name"}
                onChange={(e) => setMentorName(e.target.value)}
                defaultValue="Choose Mentor" // Set default value to empty string
              >
                <option value="">Choose Mentor</option>{" "}
                {Mlist &&
                  Mlist.data.mentorNames.map((mentorName, index) => (
                    <option key={index} value={mentorName}>
                      {mentorName}
                    </option>
                  ))}
              </select>

              <input
                className="p-3 border-none"
                type="password"
                placeholder={"password"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="p-3 border-none"
                type="password"
                placeholder={"Confirm Password"}
                onChange={(e) => setconfirmPassword(e.target.value)}
              />

              <button className="bg-blue-300 p-3">Register</button>
            </form>
          </div>
        )}
      </div>
      <div className="w-1/2 h-screen">
        <Carousel autoplay>
          <div className="bg-orange-300 w-1/2 h-screen ">
            <img src={RNSIT} className="w-11/12 h-72 ml-7 mt-7" />
            <div className="ml-9 mt-7">
              <p className="text-white text-4xl font-serif text-center ">
                "Your First Step to a Brighter Future."
              </p>
            </div>
          </div>
          <div className="bg-purple-300 w-1/2 h-screen ">
            <img src={Backgimg} className="w-11/12 h-72 ml-7 mt-7" />
            <div className="ml-9 mt-7">
              <p className="text-white text-4xl font-serif text-center ">
                "Lush Green Campus with Top Placement Opportunities"
              </p>
            </div>
          </div>
          <div className="bg-teal-500 w-1/2 h-screen ">
            <img src={CSE} className="w-11/12 h-60 ml-7 mt-7" />
            <div className="ml-9 mt-7">
              <p className="text-white text-4xl font-serif text-center ">
                "Preparing Better Computer Professionals for a Real World"
              </p>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
}
