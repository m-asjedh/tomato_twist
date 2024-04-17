import { FcBusinessman } from "react-icons/fc";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import DeleteModalMssg from "../../components/DeleteModalMssg";
import Particle from "../../components/Particle";

//profilr page component
const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3001/profile", {
          headers: {
            Authorization: ` ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchUserData();
  }, []);

  // handle account deleting
  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:3001/delete-account", {
        headers: {
          Authorization: `${token}`,
        },
      });
      navigate("/signup");
    } catch (error) {
      console.log("Error deleting account:", error);
    }
  };

  return (
    <div>
      <Particle />
      <div>
        <Navbar />
        <div className="flex justify-center items-center mt-8">
          <div className="w-[400px] p-6 bg-white rounded-lg shadow-xl text-center">
            <FcBusinessman size={120} className="mx-auto" />
            <h1 className="text-2xl font-bold mt-4 mb-6">User Profile</h1>
            {userData && (
              <>
                <div className="mt-6 ">
                  <p className="font-semibold">Username:</p>
                  <p className="text-gray-700">{userData.name}</p>
                </div>
                <div className="mt-6 ">
                  <p className="font-semibold">Email:</p>
                  <p className="text-gray-700">{userData.email}</p>
                </div>
                <div className="mt-6 ">
                  <p className="font-semibold">Highest Score:</p>
                  <p className="text-gray-700">{userData.highScore}</p>
                </div>
                <button
                  className="mt-6 bg-red-500 hover:bg-red-600 text-black font-bold py-2 px-4 rounded"
                  onClick={() => setShowModal(true)}
                >
                  Delete Account
                </button>
              </>
            )}
          </div>
        </div>
        {showModal && (
          <DeleteModalMssg
            onDelete={handleDeleteAccount}
            onCancel={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
