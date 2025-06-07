import { useState } from "react";
import "./Dropdown.scss";
import cn from "classnames";

type Props = {
  options: string[];
  dropdownName: string;
  onChoise: (value: string) => void;
  selectedValue?: string;
};

export const Dropdown: React.FC<Props> = ({
  options,
  onChoise,
  dropdownName,
  selectedValue
}) => {
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
        "dropdown__input--size": dropdownName === "Обрати розмір",
      })}
    >
      <label
        htmlFor="choose"
        className={cn("dropdown__input-label", {
          "dropdown__input-label--size": dropdownName === "Обрати розмір",
        })}
      >
        {dropdownName}
      </label>

      <div
        className={cn("dropdown__wrapper", {
          "dropdown__wrapper--focused": isSelectFocused,
          "dropdown__wrapper--size": dropdownName === "Обрати розмір",
        })}
      >
        <select
          name="choose-option"
          id="choose"
          onChange={(e) => {
            onChoise(e.target.value);
          }}
          onBlur={handleSelectBlur}
          className="dropdown__select"
          onClick={handleSelectFocus}
          value={selectedValue}
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
