"use client";
import { KAKAO_KEY } from "@/app/constants";
import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { Skeleton } from "./ui/skeleton";
declare const kakao: any;
declare const window: any;

export default function Map() {
	const mapEl = useRef(null);
	const [loading, setLoading] = useState(true);
	const [kakaoLoad, setKakaoLoad] = useState(false);

	// 지도에 마커를 표시하는 함수입니다
	const addMarker = (place: any, clusterer: any) => {
		// 마커를 생성하고 지도에 표시합니다
		const marker = new kakao.maps.Marker({
			position: new kakao.maps.LatLng(place.y, place.x),
		});
		clusterer.addMarker(marker);
	};

	const setMapLayOut = (selectedCafe: any, map: any, marker: any) => {
		// 	const content = `
		// <div class="bg-white border border-slate-500">
		//     <div class="info">
		//         <div class="grid grid-cols-2">
		//             ${selectedCafe.place_name}
		//             <div class="close" onclick="closeOverlay(overlay)" title="닫기">닫기</div>
		//         </div>
		//         <div class="flex">
		//             <div class="felx flex-grow-0 flex-shrink-0 basis-auto">
		//                 <img class='' src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="73" height="70">
		//             </div>
		//             <div class="desc">
		//                 <div class="ellipsis">${selectedCafe.address_name}</div>
		//                 <div class="ellipsis">${selectedCafe.phone}</div>
		//                 <div><a href="${selectedCafe.place_url}" target="_blank" class="link">홈페이지</a></div>
		//             </div>
		//         </div>
		//     </div>
		// </div>`;
		// 	// 마커 위에 커스텀오버레이를 표시합니다
		// 	// 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
		// 	window.overlay = new kakao.maps.CustomOverlay({
		// 		content: content,
		// 		map: map,
		// 		position: marker.getPosition(),
		// 	});
		// 	window.overlay.setMap(map);

		// 인포윈도우로 장소에 대한 설명을 표시합니다
		var infowindow = new kakao.maps.InfoWindow({
			content: `<div style="width:150px;text-align:center;padding:6px 0;">${selectedCafe.place_name}</div>`,
		});
		infowindow.open(map, marker);
	};

	const setKaKaoMap = useCallback(async () => {
		// HTML5의 geolocation으로 사용할 수 있는지 확인합니다
		let lat = 0;
		let lon = 0;
		if (navigator.geolocation) {
			// GeoLocation을 이용해서 접속 위치를 얻어옵니다
			navigator.geolocation.getCurrentPosition((position) => {
				// lat = position.coords.latitude; // 위도
				// lon = position.coords.longitude; // 경도
				lon = 127.071315; // 위도
				lat = 37.546542; // 경도

				const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
				const container = mapEl.current; //지도를 담을 영역의 DOM 레퍼런스
				const options = {
					//지도를 생성할 때 필요한 기본 옵션
					center: new kakao.maps.LatLng(lat, lon), //지도의 중심좌표.
					level: 4, //지도의 레벨(확대, 축소 정도)
				};

				// 지도를 생성합니다
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
				marker.setPosition(new kakao.maps.LatLng(lat, lon));
				marker.setMap(map);
				marker.setImage(markerImage);
				clusterer.addMarkers(marker);

				// 장소 검색 객체를 생성합니다
				const ps = new kakao.maps.services.Places(map);

				// 키워드 검색 완료 시 호출되는 콜백함수 입니다
				const placesSearch = async (data: any, status: any, options: any) => {
					if (status === kakao.maps.services.Status.OK) {
						console.log(data);
						const randomeIndex = Math.floor(Math.random() * data.length);
						const selectedCafe = data.splice(randomeIndex, 1)[0];
						console.log("selectedCafe", selectedCafe);

						const marker = new kakao.maps.Marker({
							position: new kakao.maps.LatLng(selectedCafe.y, selectedCafe.x),
						});
						clusterer.addMarker(marker);
						map.setCenter(
							new kakao.maps.LatLng(selectedCafe.y, selectedCafe.x)
						);

						setMapLayOut(selectedCafe, map, marker);

						const paramsObj = {
							origin: `${lat}, ${lon}`,
							destination: `${selectedCafe.y}, ${selectedCafe.x}`,
							priority: "RECOMMEND",
							alternatives: "true",
							road_details: "true",
							summary: "true",
						} as any;
						const queryStr = new URLSearchParams(paramsObj).toString();
						const response = await fetch(
							`//apis-navi.kakaomobility.com/v1/directions?${queryStr}`,
							{
								headers: {
									"Content-Type": "application/json",
									Authorization: `KakaoAK ${KAKAO_KEY}`,
								},
							}
						);
						const result = await response.json();
						console.log(result);

						const polyline = new kakao.maps.Polyline({
							map: map,
							path: [
								new kakao.maps.LatLng(selectedCafe.y, selectedCafe.x),
								new kakao.maps.LatLng(lat, lon),
							],
							strokeWeight: 8,
							strokeColor: "#FF00FF",
							strokeOpacity: 0.8,
							strokeStyle: "solid",
						});
					}
				};
				// 카테고리로 은행을 검색합니다
				ps.categorySearch("CE7", placesSearch, {
					useMapBounds: true,
				});
			});
		}
	}, []);

	useEffect(() => {
		console.log(1);
		if (!kakaoLoad) {
			console.log(2);
			// setKaKaoMap();
		}

		// 커스텀 오버레이를 닫기 위해 호출되는 함수입니다
		window.closeOverlay = (overlay: any) => {
			overlay.setMap(null);
		};
	}, []);

	return (
		<div className='relative'>
			<Script
				src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false&libraries=services,clusterer,drawing`}
				onLoad={() => {
					if (window.kakao) {
						kakao.maps.load(() => {
							setKakaoLoad(true);
							setKaKaoMap();
						});
					}
				}}
			/>
			{loading && (
				<Skeleton className='w-full h-full min-h-[500px] absolute top-0 left-0 z-10' />
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
