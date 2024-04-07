import { clusterState } from "@/store/inex";
import { useSetRecoilState } from "recoil";

export interface IMarkerProps {
	curLocation: any;
	clusterer: any;
	kakao: any;
	map: any;
	image?: string;
}

export function useAddMarker(props: {
	curLocation: any;
	clusterer: any;
	kakao: any;
}) {
	const setClusterData = useSetRecoilState(clusterState);
	const setMarker = (props: IMarkerProps) => {
		const { curLocation, clusterer, kakao, map, image } = props;
		const markerObj = {
			map,
			position: new kakao.maps.LatLng(curLocation.y, curLocation.x),
		} as any;
		if (image) {
			const imageSrc = image;
			const imageSize = new kakao.maps.Size(24, 35);
			const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
			markerObj.image = markerImage;
		}
		const marker = new kakao.maps.Marker(markerObj);
		// clusterer.addMarkers(marker);
		// setClusterData(clusterer)
	};
	return { setMarker };
}
