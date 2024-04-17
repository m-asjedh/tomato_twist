import React from "react";

//handle the leaderboard
/*determine the emoji base on rank
render leaderbaord */
const Leaderboard = ({ index, rank }) => {
  const getMedal = (place) => {
    if (place === 0) return "🥇";
    if (place === 1) return "🥈";
    if (place === 2) return "🥉";
    return place + 1;
  };
  console.log(rank);
  return (
    <>
      <tr key={index} className="border-b">
        <td className="py-2">{getMedal(rank)}</td>
        <td className="py-2">{index.name}</td>
        <td className="py-2">{index.highScore}</td>
      </tr>
    </>
  );
};

export default Leaderboard;
