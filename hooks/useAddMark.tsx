import { useCallback } from "react";
import useSetMap from "./useSetMap";

export interface IMarkerProps {
	map: any;
	curLocation: any;
	home?: boolean;
}

export function useAddMarker() {
	const { homeImage, mapData } = useSetMap({});

	const handleAddMarker = useCallback(
		({ map, curLocation, home }: IMarkerProps) => {
			if (!map || Object.keys(map).length === 0) return;
			const { kakao } = window;
			const markerObj = {
				map,
				position: new kakao.maps.LatLng(
					curLocation.latitude,
					curLocation.longitude
				),
			} as any;
			if (homeImage && home) {
				const imageSrc = homeImage;
				const imageSize = new kakao.maps.Size(24, 35);
				const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
				markerObj.image = markerImage;
			}
			return new kakao.maps.Marker(markerObj);
		},
		[mapData]
	);
	return { handleAddMarker };
}
