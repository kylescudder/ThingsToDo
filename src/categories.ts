import type { todo } from "./interfaces";
import { getToDo } from "./todo";

export let categoryText: string
export let todos: Array<todo> = [];

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
export async function addCategory(newCategory: string, apiBaseUrl: string, userId: number) {
	todos = []
	const response = await fetch(`${apiBaseUrl}/category`, {
		method: 'POST',
		body: JSON.stringify({
			categoryText: newCategory,
			githubId: userId,
		}),
		headers: {
			'content-type': 'application/json',
		},
	})
	let categoryId: string
	if (response.status === 200) {
		const payload = await response.json();
		categoryId = payload.data.categoryId
		categoriesPopulate(apiBaseUrl, userId)    
			.catch(() => {
				console.log('Getting categories failed')
			})
		todos = await getToDo(categoryId, apiBaseUrl, userId)
		return todos
	} else {
		alert('Failed to add category')
		return todos
	}
}
