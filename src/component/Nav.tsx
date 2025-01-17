import { Link } from "react-router-dom";
import { useDark } from "@/hooks";
import { useMemo } from "react";

function Nav() {
	const [isDark, updateDark] = useDark();
	const modeClassName = useMemo(() => {
		return isDark ? `dark:i-carbon-moon` : `i-carbon-sun`;
	}, [isDark]);
	return (
		<header
			// text-center
			// m-auto
			pb-30px
			className="prose"
		>
			<Link
				to="/"
				title="blog"
				className="w-30px h-30px absolute lg:fixed m-6 select-none outline-none important-p-0 important-m-0"
			>
				{
					<img
						className="important-m-0px"
						src={`/logo${isDark ? "-dark" : ""}.png`}
					></img>
				}
			</Link>
			<div mt-2 text-center className="nav">
				<div></div>
				<div className="right">
					<Link to="/blogs" title="blogs">
						<i className="i-carbon:blog" />
					</Link>
					<Link to="/notes" title="notes">
						<i className="i-gg:notes" />
					</Link>
					<Link to="/links">
						<i className="i-ri:link" />
					</Link>
					<a
						target="_blank"
						href="https://github.com/Torres7707"
						title="github"
					>
						<div i-uil-github-alt />
					</a>
					<a href="#" className={modeClassName} onClick={updateDark} />
				</div>
			</div>
		</header>
	);
}
export default Nav;
