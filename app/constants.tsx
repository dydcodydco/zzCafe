export const KAKAO_JS_KEY = "e4ad7d69258d2618cf891171678e3fbb";
export const KAKAO_REST_KEY = "83cb447ec7ebfded4f647b75cf3ebb56";
export const KAKAO_NAVI_URL = "//apis-navi.kakaomobility.com/v1/directions";

export interface IMapGuide {
	distance: number;
	duration: number;
	guidance: string;
	name: string;
	road_index: number;
	type: number;
	x: number;
	y: number;
}

export interface ILocation {
	latitude: number;
	longitude: number;
}

export interface IDrawRouteProps {
	oroginLocation: any;
	destinationLocation: any;
	mapData: any;
}
