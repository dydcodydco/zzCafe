import { ICafeProps, IUserProps } from "@/app/constants";
import { atom } from "recoil";

export const mapDataSate = atom({
	key: "mapDataSate",
	default: null,
});

export const clusterState = atom({
	key: "clusterState",
	default: {} as any,
});

export const curLocationState = atom({
	key: "curLocationState",
	default: {
		latitude: 0,
		longitude: 0,
	},
});

export const randomCafeState = atom({
	key: "randomCafeState",
	default: {} as ICafeProps,
});

export const loadingState = atom({
	key: "loadingState",
	default: true,
});

export const markersState = atom({
	key: "markersState",
	default: [],
});

export const aMarkerState = atom({
	key: "aMarkerState",
	default: {} as any,
});

export const userState = atom({
	key: "userState",
	default: {} as IUserProps,
});
