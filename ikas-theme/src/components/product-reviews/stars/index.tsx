import React, { useState } from "react";

// Components
import ImStarEmpty from "src/components/svg/im-star-empty";
import ImStarFull from "src/components/svg/im-star-full";

// Styles
import * as S from "./style";

export type StarType = 0 | 1 | 2 | 3 | 4 | 5;

type StarsProps = {
  editable?: boolean;
  star?: StarType;
  size?: "24px" | "14px";
  title?: string;
  onClick?: (star: 1 | 2 | 3 | 4 | 5) => void;
};

function Stars({
  star = 0,
  size = "24px",
  editable = true,
  ...props
}: StarsProps) {
  const [hoveredStar, setHoveredStar] = useState(0);
  const onStarClick = (star: 1 | 2 | 3 | 4 | 5) => {
    props.onClick && props.onClick(star);
  };

  const onMouseLeave = () => {
    setHoveredStar(0);
  };
  const onMouseOver = (star: 1 | 2 | 3 | 4 | 5) => {
    setHoveredStar(star);
  };
  return (
    <S.StarsWrapper title={props.title}>
      <Star
        isHovered={hoveredStar > 0}
        size={size}
        type={star > 0 ? "full" : "empty"}
        onMouseLeave={editable ? onMouseLeave : undefined}
        onMouseOver={editable ? () => onMouseOver(1) : undefined}
        onClick={editable ? () => onStarClick(1) : undefined}
      />
      <Star
        isHovered={hoveredStar > 1}
        size={size}
        type={star > 1 ? "full" : "empty"}
        onMouseLeave={editable ? onMouseLeave : undefined}
        onMouseOver={editable ? () => onMouseOver(2) : undefined}
        onClick={editable ? () => onStarClick(2) : undefined}
      />
      <Star
        isHovered={hoveredStar > 2}
        size={size}
        type={star > 2 ? "full" : "empty"}
        onMouseLeave={editable ? onMouseLeave : undefined}
        onMouseOver={editable ? () => onMouseOver(3) : undefined}
        onClick={editable ? () => onStarClick(3) : undefined}
      />
      <Star
        isHovered={hoveredStar > 3}
        size={size}
        type={star > 3 ? "full" : "empty"}
        onMouseLeave={editable ? onMouseLeave : undefined}
        onMouseOver={editable ? () => onMouseOver(4) : undefined}
        onClick={editable ? () => onStarClick(4) : undefined}
      />
      <Star
        isHovered={hoveredStar > 4}
        size={size}
        type={star > 4 ? "full" : "empty"}
        onMouseLeave={editable ? onMouseLeave : undefined}
        onMouseOver={editable ? () => onMouseOver(5) : undefined}
        onClick={editable ? () => onStarClick(5) : undefined}
      />
    </S.StarsWrapper>
  );
}

export default Stars;

type StarProps = {
  isHovered?: boolean;
  size: "24px" | "14px";
  type: "full" | "empty";
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
};

function Star({
  type,
  size,
  isHovered,
  onClick,
  onMouseLeave,
  onMouseOver,
}: StarProps) {
  return (
    <S.Star
      style={{
        width: size,
        height: size,
      }}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      $isClickable={!!onClick}
      $isHovered={type === "empty" && isHovered}
    >
      <S.Inner $isHovered={isHovered}>
        {type === "empty" && <ImStarEmpty className="start-icon" />}
        {type === "full" && <ImStarFull className="start-icon" />}
      </S.Inner>
      {isHovered && (
        <S.Outher className="absolute inset-0">
          <ImStarFull className="start-icon" />
        </S.Outher>
      )}
    </S.Star>
  );
}
