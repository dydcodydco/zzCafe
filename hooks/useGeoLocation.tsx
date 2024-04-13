import { curLocationState } from "@/store";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export interface ILocation {
	latitude: number;
	longitude: number;
}

export const useGeoLocation = () => {
	const [location, setLocation] = useRecoilState(curLocationState);

	useEffect(() => {
		const { geolocation } = navigator;

		if (!geolocation) return;

		geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				setLocation({
					latitude, // 위도
					longitude, // 경도
				});
			},
			(e) => {
				console.log(e);
			}
		);
	}, []);
	return location;
};
