import React, { useEffect, useState } from "react";
import "./EditProfilePage.css";
import axios from 'axios';

const EditProfilePage = () => {
  // let url = "https://www.mobrilz.digital/admin/public/";
  let url = "https://admin.taxiscout24.com/";

  let token = sessionStorage.token;
  const [fetchedUserData, setFetchedUserData] = useState([]);

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    const userData = async () => {
      try {
        let response = await fetch(` ${url}api/v1/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const DATA = await response.json();
          const convertedData = [DATA.data];

          setFetchedUserData(convertedData);
        } else {
          console.error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error creating request:", error);
      }
    };
    userData();
  }, []);

  const [user, setUser] = useState({
    name: ``,
    mobile: ``,
    email: ``,
    profile: ``,
  });
  const [selectedImage, setSelectedImage] = useState(null);
  
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const userData_edit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(` ${url}api/v1/user/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: user.name == "" ? fetchedUserData[0].name : user.name,
          email: user.email == "" ? fetchedUserData[0].email : user.email,
          profile:
            user.profile == ""
              ? fetchedUserData[0].profile_picture
              : selectedImage,
          mobile: user.mobile == "" ? fetchedUserData[0].mobile.slice(3) : user.mobile,
        }),
      });

      if (response.ok) {
        const DATA = await response.json();
        const convertedData = [DATA.data];
        setIsEditing(false);

        setFetchedUserData(convertedData);
      } else {
        console.error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error creating request:", error);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  // axios code

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setPreview(URL.createObjectURL(event.target.files[0]));
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') setName(value);
    if (name === 'mobileNumber') setMobileNumber(value);
    if (name === 'email') setEmail(value);
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('name', name);
    formData.append('mobileNumber', mobileNumber);
    formData.append('email', email);

   
    axios.post(` ${url}api/v1/user/profile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      
    })
    .catch((error) => {
      console.error('There was an error uploading the data!', error);
    });
  };
  return (
    <>
      <div className="profile-editor-container">
        {isEditing ? (
          <div className="profile-form">
            <h2>Edit Profile</h2>

            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              // placeholder={fetchedUserData[0].name}
              onChange={onInputChange}
            />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              // placeholder={fetchedUserData[0].email}
              onChange={onInputChange}
            />
            <label>Mobile:</label>

            <input
              type="text"
              name="mobileNumber"
              value={mobileNumber}
              // placeholder={fetchedUserData[0].mobile}
              onChange={onInputChange}
            />
            <input
              type="file"
              onChange={onFileChange}
            />
            {preview && <img src={preview} alt="Preview" style={{ width: '150px', height: '150px' }} />}
            <div className="buttons">
              <button type="button" onClick={onFileUpload}>Save Changes</button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
            </div>
          // </form>
        ) : (
          <div className="profile-view">
            {/* {fetchedUserData?.map(
                  ({ name, id, mobile, email, profile_picture, index }) => ( */}
            <div className="profile_box">
              <div className="profile_box_right">
                <img
                  src={fetchedUserData[0]?.profile_picture}
                  alt="Profile"
                  className="profile-avatar"
                />
              </div>

              <div className="profile_box_right">
                <h2>{fetchedUserData[0]?.name}</h2>
                <p>{fetchedUserData[0]?.email}</p>
                <p>{fetchedUserData[0]?.mobile}</p>
              </div>
            </div>
            <button id="edit_profile" onClick={handleEdit}>
              Edit Profile
            </button>
            {/* )
                  )} */}
          </div>
        )}
      </div>
    </>
  );
};

export default EditProfilePage;
