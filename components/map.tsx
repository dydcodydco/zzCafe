"use client";
import { KAKAO_KEY } from "@/app/constants";
import Script from "next/script";
import { useEffect, useRef } from "react";
declare const kakao: any;

export default function Map() {
	const mapEl = useRef(null);

	const setKaKaoMap = async () => {
		// HTML5의 geolocation으로 사용할 수 있는지 확인합니다
		let lat = 0;
		let lon = 0;
		if (navigator.geolocation) {
			// GeoLocation을 이용해서 접속 위치를 얻어옵니다
			navigator.geolocation.getCurrentPosition((position) => {
				console.log("position", position);
				// lat = position.coords.latitude; // 위도
				// lon = position.coords.longitude; // 경도
				lon = 127.071315; // 위도
				lat = 37.546542; // 경도

				const locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

				// console.log("locPosition", locPosition);
				// 마커와 인포윈도우를 표시합니다
				// displayMarker(locPosition);

				const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
				const container = mapEl.current; //지도를 담을 영역의 DOM 레퍼런스
				const options = {
					//지도를 생성할 때 필요한 기본 옵션
					center: new kakao.maps.LatLng(lat, lon), //지도의 중심좌표.
					level: 3, //지도의 레벨(확대, 축소 정도)
				};

				// 지도를 생성합니다
				const map = new kakao.maps.Map(container, options);
				const imageSrc =
					"//t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
				const imageSize = new kakao.maps.Size(24, 35);
				const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
				new kakao.maps.Marker({
					map: map,
					position: new kakao.maps.LatLng(lat, lon),
					image: markerImage, // 마커 이미지
				});

				// 장소 검색 객체를 생성합니다
				const ps = new kakao.maps.services.Places(map);
				console.log("ps", ps);

				// 카테고리로 은행을 검색합니다
				ps.categorySearch("CE7", placesSearchCB, {
					useMapBounds: true,
				});

				// 키워드 검색 완료 시 호출되는 콜백함수 입니다
				async function placesSearchCB(data: any, status: any, pagination: any) {
					if (status === kakao.maps.services.Status.OK) {
						console.log(data);
						const randomeIndex = Math.floor(Math.random() * data.length) + 1;
						const selectedCafe = data.splice(randomeIndex, 1);
						console.log("selectedCafe", selectedCafe);
						const reseponse = await fetch(
							`//place.map.kakao.com/m/main/v/${selectedCafe[0].id}`
						).then((d) => d.json());
						console.log(reseponse);
						displayMarker(selectedCafe[0], map);
					}
				}

				// 지도에 마커를 표시하는 함수입니다
				function displayMarker(place: any, map: any) {
					// 마커를 생성하고 지도에 표시합니다
					const marker = new kakao.maps.Marker({
						map: map,
						position: new kakao.maps.LatLng(place.y, place.x),
					});

					// 마커에 클릭이벤트를 등록합니다
					// kakao.maps.event.addListener(marker, "click", function () {
					// 	// 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
					// 	infowindow.setContent(
					// 		'<div style="padding:5px;font-size:12px;">' +
					// 			place.place_name +
					// 			"</div>"
					// 	);
					// 	infowindow.open(map, marker);
					// });
				}
			});
		}
	};

	return (
		<div>
			<Script
				src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false&libraries=services,clusterer,drawing`}
				onLoad={() => {
					if ((window as any).kakao) {
						kakao.maps.load(() => {
							setKaKaoMap();
						});
					}
				}}
			/>
			<div ref={mapEl} className='w-full h-full min-h-[500px]'></div>
		</div>
	);
}
