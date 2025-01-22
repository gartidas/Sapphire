import { FC, useEffect, useRef, useState } from "react";
import Snowfall from "react-snowfall";
import { SM, theme, XXXL } from "../../../utils/theme";
import flowerImageSrc from "./Flower.png";
import useWindowSize from "../../../hooks/useWindowSize";

const BackgroundFallEffect: FC = () => {
  const [flowerImages, setFlowerImages] = useState<CanvasImageSource[]>([]);
  const isDesktop = useWindowSize().width > SM;
  const isLargeDesktop = useWindowSize().width > XXXL;
  const firstRender = useRef(true);

  useEffect(() => {
    const loadImages = async () => {
      const flowerImage = new Image();
      flowerImage.src = flowerImageSrc;
      await Promise.all([flowerImage.decode()]);

      setFlowerImages([flowerImage]);
    };

    if (firstRender) {
      loadImages();
      firstRender.current = false;
    }
  }, []);

  return (
    <Snowfall
      color={theme.primary}
      images={flowerImages}
      radius={[5, 15]}
      snowflakeCount={isDesktop ? (isLargeDesktop ? 175 : 75) : 25}
    />
  );
};

export default BackgroundFallEffect;
