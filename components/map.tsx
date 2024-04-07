"use client";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { useRecoilState } from "recoil";
import { mapDataSate } from "@/store/inex";
import { useAddMarker } from "@/hooks/useAddMark";
import { useRandomCafe } from "@/hooks/useRandomCafe";

export default function Map() {
	const mapEl = useRef(null);
	const [loading, setLoading] = useState(true);
	const curLocation = useGeoLocation();
	const [mapData, setMapData] = useRecoilState(mapDataSate);
	const { setMarker } = useAddMarker({} as any);
	const { setRandomCafeMap } = useRandomCafe();

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

			// 주위 카페 중 랜덤 카페 하나 가져와서 지도에 세팅
			setRandomCafeMap({
				clusterer,
				map,
				curLocation: {
					y: latitude,
					x: longitude,
				},
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
				<Skeleton className='w-full h-full min-h-[300px] bg-neutral-300 lg:min-h-[600px] absolute top-0 left-0 z-10' />
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
