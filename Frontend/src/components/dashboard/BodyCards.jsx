import React from "react";

const BodyCards = ({ icons, text, number, color }) => {
  return (
    <div className="rounded flex bg-white">
      <div
        className={`text-3xl flex justify-center items-center ${color}  text-white px-4`}
      >
        {icons}
      </div>
      <div className="pl-4 py-1">
        <p className="text-lg font-semibold">{text}</p>
        <p className="text-lg font-bold">{number}</p>
      </div>
    </div>
  );
};

export default BodyCards;
