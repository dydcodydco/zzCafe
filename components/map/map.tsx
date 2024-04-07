"use client";
import { KAKAO_JS_KEY, KAKAO_NAVI_URL, KAKAO_REST_KEY } from "@/app/constants";
import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { IMapGuide } from "./interface";
import { ILocation, useGeoLocation } from "@/hooks/useGeoLocation";

export function addMarker(place: any, clusterer: any, kakao: any) {
	const marker = new kakao.maps.Marker({
		position: new kakao.maps.LatLng(place.y, place.x),
	});
	clusterer.addMarker(marker);
}

export function setMapLayOut(
	selectedCafe: any,
	map: any,
	marker: any,
	kakao: any
) {
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

	window.closeOverlay = (overlay: any) => {
		overlay.setMap(null);
	};
}

export default function Map() {
	const mapEl = useRef(null);
	const [loading, setLoading] = useState(true);
	const curLocation = useGeoLocation();
	const [mapData, setMapData] = useState();
	const [cluster, setCluster] = useState();

	useEffect(() => {
		const { kakao } = window;
		const { latitude, longitude } = curLocation;
		if (!kakao && latitude === 0 && longitude === 0) return;

		kakao.maps.load(() => {
			const container = mapEl.current;
			const options = {
				center: new kakao.maps.LatLng(latitude, longitude),
				level: 5,
			};

			const map = new kakao.maps.Map(container, options);

			kakao.maps.event.addListener(map, "tilesloaded", function (data: any) {
				setLoading(false);
			});

			const clusterer = new kakao.maps.MarkerClusterer({
				map: map,
				averageCenter: true,
				minLevel: 4,
			});
		});
	}, [curLocation]);

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
