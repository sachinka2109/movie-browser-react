import { useState, useEffect } from "react";

const useRevenueConverter = (initialValue) => {
  const [formattedValue, setFormattedValue] = useState("");

  useEffect(() => {
    const convertNumber = (value) => {
      let result = value;

      if (value >= 1e9) {
        result = (value / 1e9).toFixed(2) + "B";
      } else if (value >= 1e6) {
        result = (value / 1e6).toFixed(2) + "M";
      } else if (value >= 1e3) {
        result = (value / 1e3).toFixed(2) + "T";
      }

      setFormattedValue(result);
    };

    convertNumber(initialValue);
  }, [initialValue]);

  return formattedValue;
};

export default useRevenueConverter;
