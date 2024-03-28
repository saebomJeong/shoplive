import { useEffect, useState } from "react";
import styled from "styled-components";
import Slide from "./Slide";

interface Props {
  colors: string[];
  type: "long" | "fat";
}

const SwipeCard = (props: Props) => {
  const { colors, type } = props;
  const width = type === "long" ? 80 : 50;

  const Frame = styled.div`
    width: ${width}%;
    margin-bottom: 30px;
  `;

  const ColorList = styled.div`
    text-align: center;
  `;

  return (
    <Frame>
      
      <Slide
        colors={colors}
        height={type === "fat" ? 120 : 60}
      />
      <ColorList>[{colors.map((color) => `"${color}"`).join(", ")}]</ColorList>
    </Frame>
  );
};

export default SwipeCard;
