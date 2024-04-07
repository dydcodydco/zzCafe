import { useEffect, useState } from "react";

export interface ILocation {
	latitude: number;
	longitude: number;
}

export const useGeoLocation = () => {
	const [curLocation, setCulLocation] = useState<ILocation>({
		latitude: 0,
		longitude: 0,
	});

	useEffect(() => {
		const { geolocation } = navigator;

		if (!geolocation) return;

		geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				setCulLocation({
					latitude, // 위도
					longitude, // 경도
				});
			},
			(e) => {
				console.log(e);
			}
		);
	}, []);
	return curLocation;
};
