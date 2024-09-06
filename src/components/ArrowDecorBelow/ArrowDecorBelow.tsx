import "./ArrowDecorBelow.scss";

export const ArrowDecorBelow = () => {
  return (
    <>
      <img
        src={require("../../styles/icons/curve_line.svg").default}
        className="curve curve__below--top-left"
        alt="Logo"
      />
      <img
        src={require("../../styles/icons/curve_line.svg").default}
        className="curve curve__below--bottom-left"
        alt="Logo"
      />

      <img
        src={require("../../styles/icons/curve_line.svg").default}
        className="curve curve__below--top-right"
        alt="Logo"
      />
      <img
        src={require("../../styles/icons/curve_line.svg").default}
        className="curve curve__below--bottom-right"
        alt="Logo"
      />
    </>
  );
};
