import {
	IDrawRouteProps,
	KAKAO_NAVI_URL,
	KAKAO_REST_KEY,
} from "@/app/constants";
import { randomCafeState } from "@/store/inex";
import { formatMeterWithComma } from "@/utils/formatMeterWithComma";
import { formatMoneyKRW } from "@/utils/formatMoneyFRW";
import { useRecoilState } from "recoil";

export const useDrawRoute = () => {
	const [randomCafe, setRandomCafe] = useRecoilState(randomCafeState);
	const drawRoute = async ({
		oroginLocation,
		destinationLocation,
		mapData,
	}: IDrawRouteProps) => {
		try {
			const { kakao } = window;
			const paramsObj = {
				origin: `${oroginLocation.x},${oroginLocation.y}`,
				destination: `${destinationLocation.x},${destinationLocation.y}`,
				priority: "RECOMMEND",
			};

			const queryStr = new URLSearchParams(paramsObj).toString();
			const response = await fetch(`${KAKAO_NAVI_URL}?${queryStr}`, {
				method: "GET",
				headers: {
					Authorization: `KakaoAK ${KAKAO_REST_KEY}`,
					"content-type": "application/json",
				},
			});

			const result = await response.json();
			const guideArr = result.routes[0].sections[0].guides.map(
				(guide: any) => new kakao.maps.LatLng(guide.y, guide.x)
			);
			randomCafe.distance = formatMeterWithComma(
				result.routes[0].summary.distance
			);
			randomCafe.taxiFee = formatMoneyKRW(result.routes[0].summary.fare.taxi);
			setRandomCafe(randomCafe);

			new kakao.maps.Polyline({
				map: mapData,
				path: guideArr,
				strokeWeight: 8,
				strokeColor: "pink",
				strokeOpacity: 0.8,
				strokeStyle: "solid",
			});
		} catch (e) {
			console.error(e);
		}
	};
	return {
		drawRoute,
	};
};
