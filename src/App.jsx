/* eslint-disable react/prop-types */
import React, {useEffect, useRef, useState} from "react";
import {useLayoutEffect} from "react";
import {Image, Layer, Stage} from "react-konva";
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
const MaskImage = ({src}) => {
	const [image] = useImage(src);
	const ref = useRef();
	useLayoutEffect(() => {
		ref.current.cache();
		ref.current.drawHitFromCache();
		console.log(ref.current.width());
	}, [image]);
	return (
		<Image
			onClick={(e) => {
				console.log("click", e);
			}}
			width={window.innerWidth}
			height={window.innerHeight}
			image={image}
			draggable
			ref={ref}
		/>
	);
};
const App = () => {
	const stageRef = useRef(null);

	// useEffect(() => {
	// 	console.log(stageRef.current.canvas.getContext());
	// }, []);
	return (
		<Stage width={window.innerWidth} height={window.innerHeight}>
			<Layer ref={stageRef}>
				<MaskImage src="/images/original.jpg" />
				<MaskImage src={"/images/mask_1.png"} />
				<MaskImage src={"/images/mask_2.png"} />
				<MaskImage src={"/images/mask_3.png"} />
			</Layer>
		</Stage>
	);
};

export default App;
