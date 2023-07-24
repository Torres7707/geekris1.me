function Charmander() {
	const html = window.document.querySelector("html")!;
	return (
		<img
			src="/Charmander.jpeg"
			className="caodong fixed left-50px top-50% h-25vw important-w-25vw"
			draggable="false"
			style={{
				transform: `translateY(-50%)`,
			}}
		></img>
	);
}

export default Charmander;
