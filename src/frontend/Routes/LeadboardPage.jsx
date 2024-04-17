import { useEffect, useState } from "react";
import Leaderboard from "../../components/Leaderboard.jsx";
import Navbar from "../../components/Navbar.jsx";
import axios from "axios";
import Particle from "../../components/Particle.jsx";

//leaderboard page component
const LeaderboardPage = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  //fetch leaderboard data from the server
  useEffect(() => {
    const fetchLeaderBoard = async () => {
      try {
        const response = await axios.get("http://localhost:3001/leaderboard");
        setLeaderboardData(response.data);
      } catch (error) {
        console.log("Error in Fetching data", error);
      }
    };
    fetchLeaderBoard();
  }, []);

  return (
    <div>
      <Particle />
      <div>
        <Navbar />
        <div className="mx-20 my-10">
          <h1 className="text-3xl font-bold mb-4 text-center">Leaderboard</h1>
          <div className="bg-white rounded-lg shadow-xl p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Rank</th>
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((index, idx) => (
                  <Leaderboard
                    key={idx}
                    index={index}
                    rank={leaderboardData.indexOf(index)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
