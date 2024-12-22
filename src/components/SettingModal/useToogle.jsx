import { useState } from "react";

const useToggle = () => {
  const [state, setState] = useState({
    old_password: false,
    new_password: false,
    confirmPassword: false,
  });
  const toggle = (key) => {
    setState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return [state, toggle];
};
export default useToggle;
