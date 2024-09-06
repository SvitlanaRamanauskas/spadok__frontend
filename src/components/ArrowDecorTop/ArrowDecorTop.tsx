import "./ArrowDecorTop.scss";

export const ArrowDecorTop = () => {
  return (
    <>
      <img
        src={require("../../styles/icons/curve_line.svg").default}
        className="curve curve--top-left"
        alt="Logo"
      />
      <img
        src={require("../../styles/icons/curve_line.svg").default}
        className="curve curve--bottom-left"
        alt="Logo"
      />

      <img
        src={require("../../styles/icons/curve_line.svg").default}
        className="curve curve--top-right"
        alt="Logo"
      />
      <img
        src={require("../../styles/icons/curve_line.svg").default}
        className="curve curve--bottom-right"
        alt="Logo"
      />
    </>
  );
};
