"use client";
import { KAKAO_JS_KEY, KAKAO_NAVI_URL, KAKAO_REST_KEY } from "@/app/constants";
import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { IMapGuide } from "./interface";
import { ILocation, useGeoLocation } from "@/hooks/useGeoLocation";

export default function Map() {
	const mapEl = useRef(null);
	const [loading, setLoading] = useState(true);

	// 지도에 마커를 표시하는 함수입니다
	const addMarker = (place: any, clusterer: any) => {
		const marker = new kakao.maps.Marker({
			position: new kakao.maps.LatLng(place.y, place.x),
		});
		clusterer.addMarker(marker);
	};

	const setMapLayOut = (selectedCafe: any, map: any, marker: any) => {
		const content = `
		<div class="bg-white border border-slate-500 rounded-2xl px-3 py-1 text-sm flex items-center">
		            ${selectedCafe.place_name}
		            <div class="ml-[4px] mb-[2px]" onclick="closeOverlay(overlay)">
						<svg width="15" height="15" className='ml-5' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</div>
		</div>`;

		window.overlay = new kakao.maps.CustomOverlay({
			content: content,
			map: map,
			position: marker.getPosition(),
			xAnchor: 0.5,
			yAnchor: 2,
		});
		window.overlay.setMap(map);

		// 인포윈도우로 장소에 대한 설명을 표시합니다
		// var infowindow = new kakao.maps.InfoWindow({
		// 	content: `<div style="width:150px;text-align:center;padding:6px 0;">${selectedCafe.place_name}</div>`,
		// });
		// infowindow.open(map, marker);
	};

	const location = useGeoLocation();
	const setKaKaoMap = useCallback(async () => {
		const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
		const container = mapEl.current; //지도를 담을 영역의 DOM 레퍼런스
		const options = {
			center: new kakao.maps.LatLng(location.latitude, location.longitude), //지도의 중심좌표.
			level: 4, //지도의 레벨(확대, 축소 정도)
		};

		const map = new kakao.maps.Map(container, options);
		kakao.maps.event.addListener(map, "tilesloaded", function (data: any) {
			setLoading(false);
		});

		const clusterer = new kakao.maps.MarkerClusterer({
			map: map,
			averageCenter: true,
			minLevel: 3,
		});

		const imageSrc =
			"//t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
		const imageSize = new kakao.maps.Size(24, 35);
		const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
		const marker = new kakao.maps.Marker();
		marker.setPosition(
			new kakao.maps.LatLng(location.latitude, location.longitude)
		);
		marker.setMap(map);
		marker.setImage(markerImage);
		clusterer.addMarkers(marker);

		const ps = new kakao.maps.services.Places(map);

		const placesSearch = async (data: any, status: any, options: any) => {
			if (status === kakao.maps.services.Status.OK) {
				const randomeIndex = Math.floor(Math.random() * data.length);
				const selectedCafe = data.splice(randomeIndex, 1)[0];

				const marker = new kakao.maps.Marker({
					position: new kakao.maps.LatLng(selectedCafe.y, selectedCafe.x),
				});
				clusterer.addMarker(marker);
				map.setCenter(new kakao.maps.LatLng(selectedCafe.y, selectedCafe.x));

				setMapLayOut(selectedCafe, map, marker);

				try {
					const paramsObj = {
						origin: `${location.longitude}, ${location.latitude}`,
						destination: `${selectedCafe.x}, ${selectedCafe.y}`,
						priority: "RECOMMEND",
					} as any;
					const queryStr = new URLSearchParams(paramsObj) as any;
					const response = await fetch(`${KAKAO_NAVI_URL}?${queryStr}`, {
						method: "GET",
						headers: {
							Authorization: `KakaoAK ${KAKAO_REST_KEY}`,
							"content-type": "application/json",
						},
					});
					const result = await response.json().catch((e) => {
						throw e;
					});
					const guideArr = result.routes[0].sections[0].guides.map(
						(guide: IMapGuide) => new kakao.maps.LatLng(guide.y, guide.x)
					);

					new kakao.maps.Polyline({
						map: map,
						path: guideArr,
						strokeWeight: 8,
						strokeColor: "pink",
						strokeOpacity: 0.8,
						strokeStyle: "solid",
					});
				} catch (e) {
					console.log(e);
				}
			}
		};
		ps.categorySearch("CE7", placesSearch, {
			useMapBounds: true,
		});
	}, [location.latitude, location.longitude]);

	useEffect(() => {
		const { kakao } = window;
		const { latitude, longitude } = location;
		if (!kakao && latitude === 0 && longitude === 0) return;

		kakao.maps.load(() => {
			setKaKaoMap();
		});

		window.closeOverlay = (overlay: any) => {
			overlay.setMap(null);
		};
	}, [location, setKaKaoMap]);

	return (
		<div className='relative'>
			{loading && (
				<Skeleton className='w-full h-full min-h-[400px] lg:min-h-[500px] absolute top-0 left-0 z-10' />
			)}
			<div
				ref={mapEl}
				className={`w-full h-full min-h-[500px] ${
					loading ? "invisible" : "block"
				}`}
			></div>
		</div>
	);
}
