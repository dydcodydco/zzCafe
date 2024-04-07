import { ICafeProps } from "@/app/constants";

export interface IMapOverayProps {
	map: any;
	cafeLocation: { y: number; x: number };
	marker?: any;
	cafe?: ICafeProps;
}

export function useMapOveray() {
	const mapOveray = ({ map, cafeLocation, marker, cafe }: IMapOverayProps) => {
		const { kakao } = window;
		const { y, x } = cafeLocation;
		const position = new kakao.maps.LatLng(y, x);
		const newMarker = marker
			? marker
			: new kakao.maps.Marker({
					map: map,
					position,
			  });
		const content = `<div class='overlay-label'>
                    ${cafe ? cafe?.place_name : "내 위치"}
                    <div class="close" onclick="closeOverlay()" title="닫기">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>`;

		const overlay = new kakao.maps.CustomOverlay({
			content: content,
			map: map,
			position,
			xAnchor: 0.5,
			yAnchor: 1.9,
		});

		kakao.maps.event.addListener(newMarker, "click", function () {
			overlay.setMap(map);
		});

		window.closeOverlay = () => {
			overlay.setMap(null);
		};
	};
	return { mapOveray };
}
