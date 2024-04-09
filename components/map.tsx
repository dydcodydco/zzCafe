"use client";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { useRecoilState } from "recoil";
import { loadingState, mapDataSate } from "@/store/inex";
import { useAddMarker } from "@/hooks/useAddMark";
import { useRandomCafe } from "@/hooks/useRandomCafe";
import { useMapOveray } from "@/hooks/useMapOverlay";
import useSetMap from "@/hooks/useSetMap";

export default function Map() {
	useGeoLocation();
	const { handleAddMarker } = useAddMarker();
	const { handleMapOveray } = useMapOveray();
	const { handleRandomCafe } = useRandomCafe();
	const { loading, mapEl } = useSetMap({
		handleAddMarker,
		handleMapOveray,
		handleRandomCafe,
	});

	return (
		<div className='relative'>
			{loading && (
				<Skeleton className='w-full h-full min-h-[300px] bg-neutral-300 lg:min-h-[600px] absolute top-0 left-0 z-10' />
			)}
			<div
				ref={mapEl}
				className={`w-full h-full min-h-[300px] lg:min-h-[600px] ${
					loading ? "invisible" : "block"
				}`}
			></div>
		</div>
	);
}
