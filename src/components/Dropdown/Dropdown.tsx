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
      className="dropdown__input"
    >
      <label htmlFor="choose" className="dropdown__input-label">
        {dropdownName}
      </label>

      <div className={cn("dropdown__wrapper", {
        "dropdown__wrapper--focused": isSelectFocused,
      })}>
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
    </div>
  );
};
