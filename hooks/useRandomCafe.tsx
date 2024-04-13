import { useCallback } from "react";
import { useAddMarker } from "./useAddMark";
import { useDrawRoute } from "./useDrawRoute";
import { useMapOveray } from "./useMapOverlay";
import useSetMap from "./useSetMap";
import { ICafeProps, ILocation } from "@/app/constants";
import { useRecoilState } from "recoil";
import { randomCafeState } from "@/store";

export interface IRandomCafeProps {
	map: any;
	curLocation: ILocation;
}

export function useRandomCafe() {
	const { drawRoute } = useDrawRoute();
	const { handleAddMarker } = useAddMarker();
	const { handleMapOveray } = useMapOveray();
	const [randomCafe, setRandomCafe] = useRecoilState(randomCafeState);
	const handleRandomCafe = useCallback(
		({ map, curLocation }: IRandomCafeProps) => {
			// 주위 카페 중 랜덤 카페 하나 가져오기
			const { kakao } = window;
			const { latitude, longitude } = curLocation;
			const ps = new kakao.maps.services.Places(map);
			const placesSearchCB = async (data: any, status: any) => {
				if (status === kakao.maps.services.Status.OK) {
					const selectedCafe = data[Math.floor(Math.random() * data.length)];
					// setRandomCafe(selectedCafe);

					// 오늘의 랜덤 카페 표시
					const curLocationObj = {
						longitude: selectedCafe.x,
						latitude: selectedCafe.y,
					};
					const marker = handleAddMarker({
						map,
						curLocation: curLocationObj,
					});
					handleMapOveray({
						map,
						marker,
						curLocation: curLocationObj,
						randomCafe: selectedCafe,
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
		},
		[]
	);
	return { handleRandomCafe };
}
