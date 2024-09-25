import './ThreadDecor.scss';

export const ThreadDecor = () => {
    return (
        <>
          <img src={require("../../styles/icons/curve_line.svg").default} className="curve curve--top-left" alt="Logo" />
          <img src={require("../../styles/icons/curve_line.svg").default} className="curve curve--bottom-left" alt="Logo" />

          <img src={require("../../styles/icons/curve_line.svg").default} className="curve curve--top-right" alt="Logo" />
          <img src={require("../../styles/icons/curve_line.svg").default} className="curve curve--bottom-right" alt="Logo" />

          <img src={require("../../styles/icons/Line-thread.svg").default} className="thread thread--top-left thread--tablet" alt="Logo" />
          <img src={require("../../styles/icons/Line-thread.svg").default} className="thread thread--bottom-left thread--tablet" alt="Logo" />
          <img src={require("../../styles/icons/Line-thread.svg").default} className="thread thread--top-right thread--tablet" alt="Logo" />
          <img src={require("../../styles/icons/Line-thread.svg").default} className="thread thread--bottom-right thread--tablet" alt="Logo" />
        </>
    );
}

