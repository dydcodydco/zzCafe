"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { useRecoilState } from "recoil";
import { clusterState, mapDataSate, randomCafeState } from "@/store/inex";
import { useAddMarker } from "@/hooks/useAddMark";
import {
	IDrawRouteProps,
	KAKAO_NAVI_URL,
	KAKAO_REST_KEY,
} from "@/app/constants";

export default function Map() {
	const mapEl = useRef(null);
	const [loading, setLoading] = useState(true);
	const curLocation = useGeoLocation();
	const [mapData, setMapData] = useRecoilState(mapDataSate);
	const [clusterData, setCluster] = useRecoilState(clusterState);
	const [randomCafe, setRandomCafe] = useRecoilState(randomCafeState);
	const { setMarker } = useAddMarker({} as any);

	const drawRoute = useCallback(
		async ({
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
				randomCafe.taxiFee = formatMoneyKRW(result.routes[0].summary.fee);
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
		},
		[]
	);

	useEffect(() => {
		const { kakao } = window;
		if (
			!kakao ||
			!curLocation ||
			!curLocation.latitude ||
			!curLocation.longitude
		)
			return;
		const { latitude, longitude } = curLocation;

		kakao.maps.load(() => {
			const container = mapEl.current;
			const options = {
				center: new kakao.maps.LatLng(latitude, longitude),
				level: 5,
			};

			// 지도 만들기
			const map = new kakao.maps.Map(container, options);

			const clusterer = new kakao.maps.MarkerClusterer({
				map: map,
				averageCenter: true,
				minLevel: 5,
			});

			// 내 집 표시
			setMarker({
				curLocation: { y: latitude, x: longitude },
				clusterer,
				kakao,
				map,
				image:
					"//t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
			});

			// 주위 카페 중 랜덤 카페 하나 가져오기
			const ps = new kakao.maps.services.Places(map);
			const placesSearchCB = async (data: any, status: any) => {
				const { kakao } = window;
				if (status === kakao.maps.services.Status.OK) {
					const selectedCafe = data[Math.floor(Math.random() * data.length)];
					setRandomCafe(selectedCafe);
					console.log(selectedCafe);
					// 오늘의 랜덤 카페 표시
					setMarker({
						curLocation: { y: selectedCafe.y, x: selectedCafe.x },
						clusterer,
						kakao,
						map,
					});

					drawRoute({
						oroginLocation: { y: latitude, x: longitude },
						destinationLocation: { y: selectedCafe.y, x: selectedCafe.x },
						mapData: map,
					});
				}
			};
			ps.categorySearch("CE7", placesSearchCB, {
				useMapBounds: true,
			});

			kakao.maps.event.addListener(map, "tilesloaded", function (data: any) {
				setLoading(false);
				if (!map) {
					setMapData(map);
					setMapData(clusterer);
				}
			});
		});
	}, [curLocation]);

	return (
		<div className='relative'>
			{loading && (
				<Skeleton className='w-full h-full min-h-[300px] lg:min-h-[600px] absolute top-0 left-0 z-10' />
			)}
			<div
				ref={mapEl}
				className={`w-full h-full min-h-[300px] lg:min-h-[600px] ${
					loading ? "invisible" : "block"
				}`}
			></div>
		</div>
	);
}
