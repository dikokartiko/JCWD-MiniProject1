import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FileInput, Label } from "flowbite-react";
import ChangeUsernamePage from "../Authentication/Account/ChangeUserName";
import ChangeEmail from "../Authentication/Account/ChangeEmail";
import ChangePhoneNumber from "../Authentication/Account/ChangePhoneNumber";
import ChangePassword from "../Authentication/Account/ChangePassword";
function UserProfile() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [userData, setUserData] = useState({
    username: "",
    imgProfile: "",
    phone: "",
    email: "",
    isVerified: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://minpro-blog.purwadhikabootcamp.com/api/auth",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data);
        const { username, imgProfile, email, phone, isVerified } = res.data;
        setUserData({ username, imgProfile, email, phone, isVerified });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  const handleProfileUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", selectedFile);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        "https://minpro-blog.purwadhikabootcamp.com/api/profile/single-uploaded",
        formData,
        config
      );
      console.log(response.data);
      // reset screen
      window.location.reload(false);
      // Handle response
    } catch (error) {
      console.log(error);
      // Error Handle
    }
  };

  const handleResetPassword = () => {
    navigate("/changepassword");
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="flex flex-col  gap-10">
      <div className="ml-auto mr-auto">
        {userData.imgProfile && (
          <img
            src={`https://minpro-blog.purwadhikabootcamp.com/${userData.imgProfile}`}
            alt={userData.username}
            className="w-48 items-center h-48 rounded-full"
          />
        )}
      </div>
      <div className="grid justify-center">
        <h2 className=" font-bold text-2xl">UserName: {userData.username}</h2>
        <h2 className=" font-bold text-2xl">PhoneNumber: {userData.phone}</h2>
        <h2 className=" font-bold text-2xl">email: {userData.email}</h2>
        <h2 className=" font-bold text-2xl">
          email: {userData.isVerified ? "Verified ✅" : "not verified ❌"}
        </h2>
      </div>

      <div className="mb-2 block ml-5 mr-5">
        <Label htmlFor="file" value="Upload Profile Picture" />
        <FileInput type="file" onChange={handleAvatarUpload} />
        <button
          className=" bg-teal-500 text-white rounded-md text-sm"
          onClick={handleProfileUpdate}>
          Upload
        </button>
      </div>

      <div className="bg-white shadow-md p-4 rounded-md ">
        <ChangeUsernamePage />
      </div>

      <div className="bg-white shadow-md p-4 rounded-md">
        <ChangeEmail />
        <ChangePhoneNumber />
        <ChangePassword />
        {/* <div className="text-left w-96" id="fileUpload">
            <div className="mb-2 block">
              <Label htmlFor="file" value="Upload Profile Picture" />
            </div>
            <FileInput id="file" />
            <div className="mb-2 block w-28 ">
              <Button color="dark">Change Photo</Button>
            </div>
          </div>
          <div className="text-left w-96">
            <br />
            <div className="mb-2 block">
              <Label value="Change UserName" />
            </div>
            <TextInput placeholder="UserName" shadow type="Username" />
            <br />
            <div className="mb-2 block w-28">
              <Button
                onClick={(e) => {
                  userName = "rian";
                }}
                color="dark">
                Change UserName
              </Button>
            </div>
          </div>
          <div className="text-left w-96">
            <br />
            <div className="mb-2 block">
              <Label value="Change PhoneNumber" />
            </div>
            <TextInput placeholder="phoneNumber" shadow type="Username" />
            <br />
            <div className="mb-2 block w-28">
              <Button color="dark">Change PhoneNumber</Button>
            </div>
          </div>
          <div className="text-left w-96">
            <br />
            <div className="mb-2 block">
              <Label value="Change Password" />
            </div>
            <TextInput
              placeholder="Current Password"
              shadow
              type="password"
            />
            <TextInput placeholder="Password" shadow type="password" />
            <TextInput
              placeholder="Confirm Password"
              shadow
              type="password"
            />
            <br />
            <div className="mb-2 block w-28">
              <Button color="dark">Change Password</Button>
            </div>
          </div> */}
      </div>
    </div>
  );
}

export default UserProfile;
