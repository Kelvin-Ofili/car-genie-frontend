// import { Error500Icon } from "assets";
import { ErrorUI } from "../errorUI";

const Error500UI = () => {
	return (
		<>
			<ErrorUI
				// img={<Error500Icon className="w-[40%]" />}
				errorCode="500"
				title="Uh-oh, that wasn’t supposed to happen"
				message="We are working on fixing the problem. Be back soon."
			/>
		</>
	);
};

export { Error500UI };
