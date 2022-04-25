export async function categoriesPopulate(apiBaseUrl: string, userId: number) {
	const categoriesResponse = await fetch(`${apiBaseUrl}/categories`, {
		method: "POST",
		body: JSON.stringify({
			githubId: userId,
		}),
		headers: {
			"content-type": "application/json",
		},
	});
	const categoriesPayload = await categoriesResponse.json();
	return categoriesPayload.payload;
}
export async function addCategory(newCategory: string) {
	alert(newCategory)
}