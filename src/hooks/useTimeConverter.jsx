import { useState, useEffect } from "react";

const useTimeConverter = (totalMinutes) => {
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    const formatMinutes = (minutes) => {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;

      let formattedString = "";

      if (hours > 0) {
        formattedString += `${hours}hr `;
      }

      if (remainingMinutes > 0) {
        formattedString += `${remainingMinutes}min`;
      }

      setFormattedTime(formattedString.trim());
    };

    formatMinutes(totalMinutes);

    return () => {
      setFormattedTime("");
    };
  }, [totalMinutes]);

  return formattedTime;
};

export default useTimeConverter;
