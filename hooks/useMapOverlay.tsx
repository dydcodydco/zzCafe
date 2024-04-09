import { ICafeProps, ILocation } from "@/app/constants";
import useSetMap from "./useSetMap";
import { useCallback } from "react";

export interface IMapOverayProps {
	map: any;
	marker: any;
	curLocation?: ILocation;
	randomCafe?: ICafeProps;
}

export function useMapOveray() {
	const { mapData } = useSetMap({});
	const handleMapOveray = useCallback(
		({ map, marker, curLocation, randomCafe }: IMapOverayProps) => {
			if (!curLocation || !map || Object.keys(map).length === 0) return;
			const { kakao } = window;
			const { longitude, latitude } = curLocation;
			const position = new kakao.maps.LatLng(latitude, longitude);
			const newMarker = marker
				? marker
				: new kakao.maps.Marker({
						map,
						position,
				  });
			const overlayContent = document.createElement("div");
			overlayContent.className = "overlay-label";
			overlayContent.innerHTML = `${
				randomCafe ? randomCafe.place_name : "내 위치"
			}`;
			const closeButton = document.createElement("div");
			closeButton.className = "close";
			closeButton.title = "닫기";
			closeButton.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                              <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>`;
			overlayContent.appendChild(closeButton);

			const overlay = new kakao.maps.CustomOverlay({
				content: overlayContent,
				map,
				position,
				xAnchor: 0.5,
				yAnchor: 1.9,
			});

			kakao.maps.event.addListener(newMarker, "click", function () {
				overlay.setMap(map);
			});

			closeButton.addEventListener("click", function () {
				overlay.setMap(null);
			});
		},
		[]
	);
	return {
		handleMapOveray,
	};
}
