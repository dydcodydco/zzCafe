import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	aMarkerState,
	clusterState,
	curLocationState,
	loadingState,
	mapDataSate,
	markersState,
	randomCafeState,
} from "@/store";
import { HOME_IMAGE } from "@/app/constants";

export interface IMarkerProps {
	curLocation: any;
	kakao: any;
	mapData: any;
	image?: string;
}

export interface IRandomCafeProps {
	clusterer: any;
	map: any;
	curLocation: { y: number; x: number };
}

export interface IUseSetMapProps {
	handleAddMarker?: any;
	handleMapOveray?: any;
	handleRandomCafe?: any;
}

export default function useSetMap({
	handleAddMarker,
	handleMapOveray,
	handleRandomCafe,
}: IUseSetMapProps) {
	const mapEl = useRef(null);
	const [cluster, setCluster] = useRecoilState(clusterState);
	const [markers, setMarkers] = useRecoilState(markersState);
	const [mapData, setMapData] = useRecoilState(mapDataSate);
	const [loading, setLoading] = useRecoilState(loadingState);
	const [curLocation, setCurLocation] = useRecoilState(curLocationState);
	const [randomCafe, setRandomCafe] = useRecoilState(randomCafeState);
	const [aMarker, setAMarker] = useRecoilState(aMarkerState);

	useEffect(() => {
		const { kakao } = window;

		if (
			!(kakao && curLocation && curLocation.latitude && curLocation.longitude)
		)
			return;
		kakao.maps.load(() => {
			if (!mapEl?.current) return;

			const { latitude, longitude } = curLocation;
			const container = mapEl.current;
			const options = {
				center: new kakao.maps.LatLng(latitude, longitude),
				level: 5,
			};

			// 지도 만들기
			const map = new kakao.maps.Map(container, options);
			const clusterer = new kakao.maps.MarkerClusterer({
				map,
				averageCenter: true,
				minLevel: 5,
			});

			// 내 집 표시
			let marker;
			if (handleAddMarker) {
				marker = handleAddMarker({ map, curLocation, home: true });
			}
			// 오버레이 만들어주기
			if (handleMapOveray) {
				handleMapOveray({ map, marker, curLocation });
			}
			// 주위 카페 중 랜덤 카페 하나 가져와서 지도에 세팅
			if (handleRandomCafe) {
				handleRandomCafe({ map, curLocation });
			}

			kakao.maps.event.addListener(map, "tilesloaded", function (data: any) {
				setLoading(false);
				if (!map) {
					setMapData(map);
					setCluster(clusterer);
				}
			});
		});

		return () => {
			setCurLocation({ latitude: 0, longitude: 0 });
		};
	}, [curLocation]);

	useEffect(() => {}, []);
	return {
		loading,
		mapEl,
		curLocation,
		mapData,
		cluster,
		homeImage: HOME_IMAGE,
		setRandomCafe,
		randomCafe,
		setAMarker,
		aMarker,
		setMarkers,
		markers,
	};
}
