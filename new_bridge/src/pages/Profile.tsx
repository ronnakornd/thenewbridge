import { useState, useEffect, useRef, ImgHTMLAttributes } from "react";
import axios from "axios";

function Profile() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickname] = useState("");
  const [position, setPosition] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [id, setId] = useState<Number | null |undefined>();
  const [file, setFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [error, setError] = useState("");
  const profileImage = useRef<HTMLImageElement>();

  useEffect(() => {
    let user: any = JSON.parse(localStorage.getItem("user"));
    setId(user.id);
    axios
      .get(`${import.meta.env.VITE_DOMAIN}/api/users/${user.id}?populate=*`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((response) => {
        console.log(response);
        let user = response.data;
        setEmail(user.email);
        setUsername(user.username);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setNickname(user.nickName);
        setPosition(user.position);
        if(profileImage.current){
          profileImage.current.src = import.meta.env.VITE_DOMAIN+user.profileImage.url;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_DOMAIN}/api/users/${id}`,
        {
          username,
          email,
          firstName,
          lastName,
          nickName,
          position,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } }
      );
      console.log("update successful:", response);
      setSuccessMessage("successfully updated");
      setTimeout(() => {
        window.location.href = "/profile";
      }, 1000);
    } catch (error: any) {
      console.error("Registration error:", error.response.data);
      setRegistrationError("Registration failed. Please check your details.");
    }
  };

  const uploadImage = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("files", file);
    formData.append("ref", "plugin::users-permissions.user");
    formData.append("refId", id);
    formData.append("field", "profileImage");
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:1337/api/upload",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log("File uploaded successfully:", response);
      let data = response.data[0];
      if(profileImage.current){
        profileImage.current.src = import.meta.env.VITE_DOMAIN+data.url;
      }
      setUploadSuccess("File uploaded successfully.");
    } catch (error) {
      console.error("Error uploading file:", error.response.data);
      setError("Error uploading file.");
    }
  };

  const handleFileChange = (event: Event) => {
    setFile(event.target.files[0]);
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        // convert image file to base64 string
        if(profileImage.current){
          profileImage.current.src = reader.result;
        }
      },
      false
    );

    if (file) {
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    handleUpdate();
  };

  return (
    <div className="flex items-center p-5 justify-center min-h-screen bg-gradient-to-r from-cyan-500 via-cyan-600 to-blue-800">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              รูปโปรไฟล์
            </label>
            <div className="flex justify-center">
              <img
                src="/images/profile.jpg"
                className="w-32 h-32 object-cover rounded-full"
                alt=""
                ref={profileImage}
              />
            </div>
            <div className="flex flex-row justify-between ">
              <input
                className="w-6/12"
                onChange={handleFileChange}
                type="file"
                name=""
                id=""
              />
              {file && (
                <button className="btn btn-sm btn-neutral" onClick={uploadImage}>
                  เปลี่ยนรูปโปรไฟล์
                </button>
              )}
            </div>
            {uploadSuccess && <p className="text-green-700">{uploadSuccess}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastName"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nickname"
            >
              Nickname
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nickname"
              type="text"
              placeholder="Nickname"
              value={nickName}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="position"
            >
              Position
            </label>
            <select
              name="position"
              id="position"
              onChange={(e) => setPosition(e.target.value)}
            >
              <option value="student" selected={position == "student"}>
                นักเรียน
              </option>
              <option value="teacher" selected={position == "teacher"}>
                ครู
              </option>
              <option value="parent" selected={position == "parent"}>
                ผู้ปกครอง
              </option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {registrationError && (
            <p className="text-red-500 text-xs italic">{registrationError}</p>
          )}
          {successMessage && (
            <p className="text-green-500 text-xs italic">{successMessage}</p>
          )}

          <div className="flex items-center justify-center">
            <button className="btn btn-neutral" type="submit">
              อัพเดทโปรไฟล์
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
