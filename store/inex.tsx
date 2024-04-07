import { atom } from "recoil";

export const mapDataSate = atom({
	key: "mapDataSate",
	default: {} as any,
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
