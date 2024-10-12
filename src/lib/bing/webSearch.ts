import axios from "axios";

const BING_SEARCH_API_ENDPOINT = "https://api.bing.microsoft.com/v7.0/search";
const BING_SEARCH_API_KEY = process.env.BING_SEARCH_API_KEY;

export async function webSearch(query: string) {
	console.log("Starting webSearch function");
	console.log("Search query:", query);

	try {
		console.log("Making API call to Bing Search");
		const response = await axios.get(BING_SEARCH_API_ENDPOINT, {
			headers: {
				"Ocp-Apim-Subscription-Key": BING_SEARCH_API_KEY,
			},
			params: {
				q: query,
				count: 5,
				responseFilter: "Computation,Webpages",
				mkt: "en-US",
			},
		});

		console.log("Bing Search API response received");

		let results = [];

		if (response.data.computation) {
			console.log("Computation result found");
			results.push(response.data.computation.value);
		}

		if (response.data.webPages) {
			console.log("Number of web results:", response.data.webPages.value.length);
			results = results.concat(response.data.webPages.value.map((page: any) => page.snippet));
		}

		console.log("Processed search results:", results);
		return results;
	} catch (error) {
		console.error("Error in webSearch:", error);
		throw error;
	}
}
