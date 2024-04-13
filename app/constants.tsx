export const KAKAO_NAVI_URL = "//apis-navi.kakaomobility.com/v1/directions";
export const HOME_IMAGE =
	"//t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
export const ACCESS_TOKEN_KEY = "accessTokenKey";

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
	originLocation: any;
	destinationLocation: any;
	mapData: any;
	selectedCafe: ICafeProps;
}

export interface ICafeProps {
	address_name: string;
	category_group_code: string;
	category_group_name: string;
	category_name: string;
	distance?: string;
	taxiFee?: string;
	id: string;
	phone: string;
	place_name: string;
	place_url: string;
	road_address_name: string;
	x: string; // 경도(longitude), 카카오 API에서는 문자열로 반환됩니다.
	y: string; // 위도(latitude), 카카오 API에서는 문자열로 반환됩니다.
}

export interface IUserProps {
	id?: number;
	email: string | null;
	password?: string | null;
	name?: string | null;
	createdAt?: Date;
	updatedAt?: Date;
}
