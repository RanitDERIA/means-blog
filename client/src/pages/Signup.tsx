import Auth from "../components/Auth.js";
import Quote from "../components/Quote.js";

export default function Signup() {
	return (
		<div className="grid lg:grid-cols-2 font-head">
			<div>
				<Auth type="signup"></Auth>
			</div>
			<div className="invisible lg:visible">
				<Quote></Quote>
			</div>
		</div>
	);
}
