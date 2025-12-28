import { Button } from "components";
import React from "react";
// import { IconArrowLeft } from "@tabler/icons-react";

interface ErrorUIProps {
	// img: React.ReactNode;
	errorCode: string;
	title: string;
	message: string;
}
const ErrorUI: React.FC<ErrorUIProps> = ({
	// img,
	errorCode,
	title,
	message,
}) => {
	return (
		<>
			<div className="w-full flex flex-col items-center justify-center">
				{/* {img} */}
				<h1 className="text-blue-600 font-bold leading-8 text-4xl my-7">
					{errorCode}
				</h1>
				<h2 className="font-semibold text-base mb-2">{title}</h2>
				<div className="text-xs text-gray-600 font-normal flex justify-center text-center">
					<p className="w-[90%]">{message}</p>
				</div>
				<Button variant="fill" className="mt-7">
					<span className="mr-1">
						{/* <IconArrowLeft className="h-4 w-4" /> */} 
					</span>
					<p className="font-[500] text-xs">Go Back</p>
				</Button>
			</div>
		</>
	);
};

export { ErrorUI };
