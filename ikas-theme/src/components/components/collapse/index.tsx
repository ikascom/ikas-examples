import React, { useState } from "react";

import * as S from "./style";

type CollapseProps = {
  className?: string;
  defaultActive?: boolean;
  header: string;
  children: React.ReactNode;
};

const Collapse = (props: CollapseProps) => {
  const [active, setActive] = useState(!!props.defaultActive);

  const handleButton = () => {
    setActive(!active);
  };

  return (
    <details className={props.className}>
      <S.CollapseHeader
        aria-expanded={active}
        $active={active}
        className="collapse-header"
        onClick={handleButton}
      >
        {props.header}
        <S.CollapseIcon>
          {active ? <MdOutlineExpandLessSVG /> : <MdOutlineExpandMoreSVG />}
        </S.CollapseIcon>
      </S.CollapseHeader>
      <div className="collapse-children">{active && props.children}</div>
    </details>
  );
};

export default Collapse;

const MdOutlineExpandLessSVG = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="none" d="M0 0h24v24H0V0z"></path>
    <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14l-6-6z"></path>
  </svg>
);

const MdOutlineExpandMoreSVG = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="none" d="M24 24H0V0h24v24z" opacity=".87"></path>
    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"></path>
  </svg>
);
