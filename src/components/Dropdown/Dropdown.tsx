import { useState } from "react";
import './Dropdown.scss';
import cn from "classnames";

type Props = {
  options: string[];
  dropdownName: string;
  onChoise: (value: string) => void;
};

export const Dropdown: React.FC<Props> = ({ options, onChoise, dropdownName }) => {
  const [isSelectFocused, setIsSelectFocused] = useState(false);

  const handleSelectBlur = () => {
    setIsSelectFocused(false);
  };

  const handleSelectFocus = () => {
    setIsSelectFocused(!isSelectFocused);
  };

  return (
    <div
      className={cn("dropdown__input", {
        "dropdown__input--focused": isSelectFocused,
      })}
    >
      <label htmlFor="choose" className="dropdown__input-label">
        {dropdownName}
      </label>

      <select
        name="choose-option"
        id="choose"
        onChange={(e) => {
          onChoise(e.target.value);
        }}
        onBlur={handleSelectBlur}
        className="dropdown__select"
        onClick={handleSelectFocus}
      >
        {options.map((option) => (
          <option key={option} className="dropdown__option" value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
