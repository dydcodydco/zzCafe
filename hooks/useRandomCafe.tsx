import { useAddMarker } from "./useAddMark";
import { useDrawRoute } from "./useDrawRoute";

export interface IRandomCafeProps {
	clusterer: any;
	map: any;
	curLocation: { y: number; x: number };
}

export function useRandomCafe() {
	const { setMarker } = useAddMarker({} as any);
	const { drawRoute } = useDrawRoute();
	const setRandomCafeMap = ({
		clusterer,
		map,
		curLocation,
	}: IRandomCafeProps) => {
		// 주위 카페 중 랜덤 카페 하나 가져오기
		const { kakao } = window;
		const { y: latitude, x: longitude } = curLocation;
		const ps = new kakao.maps.services.Places(map);
		const placesSearchCB = async (data: any, status: any) => {
			if (status === kakao.maps.services.Status.OK) {
				const selectedCafe = data[Math.floor(Math.random() * data.length)];
				// setRandomCafe(selectedCafe);
				// 오늘의 랜덤 카페 표시
				setMarker({
					curLocation: { y: selectedCafe.y, x: selectedCafe.x },
					clusterer,
					kakao,
					map,
				});

				drawRoute({
					originLocation: { y: latitude, x: longitude },
					destinationLocation: { y: selectedCafe.y, x: selectedCafe.x },
					mapData: map,
					selectedCafe,
				});
			}
		};
		ps.categorySearch("CE7", placesSearchCB, {
			useMapBounds: true,
		});
	};
	return { setRandomCafeMap };
}
