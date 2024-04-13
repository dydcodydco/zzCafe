"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import Navigation from "./navigation";

interface Props {
	children: ReactNode;
}
function Providers({ children }: Props) {
	return (
		<>
			<SessionProvider>
				<Navigation />
				{children}
			</SessionProvider>
			;
		</>
	);
}

export default Providers;
