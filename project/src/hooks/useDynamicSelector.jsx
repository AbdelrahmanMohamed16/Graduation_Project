import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const useDynamicSelector = (selector) => {
  const selectedValue = useSelector(selector);
  const [currentValue, setCurrentValue] = useState(selectedValue);

  useEffect(() => {
    setCurrentValue(selectedValue);
  }, [selectedValue]);

  return currentValue;
};

export default useDynamicSelector;
