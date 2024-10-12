// this calls the backend (https://github.com/tina-mai/friday-backend) to control the local computer
// TODOs when you want to use this:
// - change the IP address to the one of the local machine when you run this!
// - make sure the backend is running!

export async function interactWithLocalMachine(prompt: string) {
	try {
		const response = await fetch("http://10.10.31.22:5001/run_interpreter", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ prompt }),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data.response;
	} catch (error) {
		console.error("Error interacting with local machine:", error);
		throw error;
	}
}
