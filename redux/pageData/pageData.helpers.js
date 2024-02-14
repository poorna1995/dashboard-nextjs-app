import appFetch from "utils/appFetch";

export const handleApiCalls = (url, data) => {
	return new Promise((resolve, reject) => {
		appFetch(url, data)
			.then((response) => {
				if (response.status === "success") {
					const result = response.result;
					return resolve(result);
				}
			})
			.catch((error) => {
				console.log(error);
				reject(error);
			});
	});
};
