import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	console.log(req);
	if (req.method !== "POST") {
		return res;
	}

	try {
		const { id } = req.body;

		const response = await fetch(`https://place.map.kakao.com/m/main/v/${id}`, {
			method: "GET",
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		});
		const data = await response.json(); // 비동기 처리
		console.log("---------------------------------");
		console.log(data);
		console.log("---------------------------------");

		return res.status(201).json({ message: "Request successful", data });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal server error" });
	}
}
