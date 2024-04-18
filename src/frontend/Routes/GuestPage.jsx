import React, { useEffect, useState } from "react";
import Particle from "../../components/Particle";
import axios from "axios";
import { Scores } from "../../class/Scores";
import { Link } from "react-router-dom";

// Initialize score instance
const score = new Scores();

//this component is responsible for the players who choose to play as guest
const GuestPage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [correctNumber, setCorrectNumber] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [hearts, setHearts] = useState(3);

  //function fetching the tomato API
  const fetchAPI = async () => {
    try {
      const url = "https://marcconrad.com/uob/tomato/api.php";
      const outParam = "json";
      const base64Param = "no";

      const response = await axios.get(url, {
        params: { out: outParam, base64Param: base64Param },
      });

      if (response.data && response.data.question) {
        setImageUrl(response.data.question);
        setCorrectNumber(response.data.solution);
        setSelectedNumber(null);
        console.log("Correct Answer:", response.data.solution);
      } else {
        throw new Error("Image URL not found in API response");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  //handle selection of the correct answer
  const handleNumberClick = (number) => {
    setSelectedNumber(number);
    if (number === correctNumber) {
      score.increaseScore();
    } else {
      loseHeart();
    }
    fetchAPI();
  };

  //handles loosing a heart
  const loseHeart = () => {
    setHearts(hearts - 1);
    if (hearts === 1) {
    } else {
      setTimeLeft(60);
      fetchAPI();
    }
  };

  //timer countdown
  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      loseHeart();
    }
    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div>
      <Particle />
      <div>
        <nav className="bg-red-400 py-4 px-6 flex justify-between items-center z-20">
          <div>
            <span className="text-black text-3xl font-semibold">
              Tomato Twist
            </span>
          </div>
          <div className="flex items-center space-x-4 text-xl">
            <Link to="/signup" className="text-black hover:underline">
              Signup
            </Link>
            <Link to="/login" className="text-black hover:underline">
              Login
            </Link>
          </div>
        </nav>
        <div className="flex flex-col items-center">
          <div className="w-3/4 p-5">
            <div className="flex justify-center items-center h-full">
              <img
                src={imageUrl}
                alt="Tomato"
                className="h-[250px] w-[450px] border-4 border-black rounded-lg shadow-lg"
              />
            </div>
          </div>
          <div className="w-[340px] flex flex-col items-center ">
            <div className="text-center font-bold">Number Palette</div>
            <div className="flex flex-wrap justify-center">
              {[...Array(10)].map((_, index) => (
                <button
                  key={index}
                  className={`mx-2 my-2 text-lg bg-blue-400 text-white rounded-full px-4 py-2 hover:bg-blue-800 hover:text-black`}
                  onClick={() => handleNumberClick(index)}
                  disabled={selectedNumber !== null}
                >
                  {index}
                </button>
              ))}
            </div>
          </div>
          <div className="text-center ">
            <div>
              Time:{" "}
              <span className="text-4xl font-bold text-red-600">
                {timeLeft}
              </span>{" "}
              secs left
            </div>
            <div>
              Tries:{" "}
              <span className="text-2xl text-red-600">
                {Array.from({ length: hearts }, (_, index) => (
                  <span key={index}>&#10084;</span>
                ))}
              </span>
            </div>
            <div>
              Score:{" "}
              <span className="text-lg font-bold">{score.getScore()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestPage;
