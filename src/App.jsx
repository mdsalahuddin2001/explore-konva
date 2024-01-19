/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import { Image, Layer, Stage } from "react-konva";
import useImage from "use-image";

function URLImage(props) {
  const imageRef = useRef(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    loadImage();
    return () => {
      if (imageRef.current) {
        imageRef.current.removeEventListener("load", handleLoad);
      }
    };
  }, []);

  useEffect(() => {
    loadImage();
  }, [props.src]);

  function handleLoad() {
    setImage(imageRef.current);
  }

  function loadImage() {
    const img = new window.Image();
    img.src = props.src;
    img.crossOrigin = "Anonymous";
    imageRef.current = img;
    imageRef.current.addEventListener("load", handleLoad);
  }

  // return <image x="{props.x}" y="{props.y}" image="{image}" />;
}
const MaskImage = ({ src }) => {
  const [image] = useImage(src);
  return (
    <Image
      filters={[{ x: 0, y: 0, width: 100, height: 100, image }]}
      onClick={(e) => {
        console.log("click", e);
      }}
      image={image}
      draggable
    />
  );
};
const App = () => {
  const stageRef = useRef(null);

  useEffect(() => {
    console.log(stageRef.current);
  }, []);
  return (
    <Stage ref={stageRef} width={window.innerWidth} height={window.innerHeight}>
      <Layer width={window.innerWidth} height={"auto"}>
        <MaskImage src="/images/original.jpg" />
        <MaskImage src={"/images/mask_1.png"} />
        <MaskImage src={"/images/mask_2.png"} />
        <MaskImage src={"/images/mask_3.png"} />
      </Layer>
    </Stage>
  );
};

export default App;
