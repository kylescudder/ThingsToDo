import { categoryList, apiBaseUrl, categoryTEXT } from "$lib/stores";
import type { todo } from "./interfaces";
import { getToDo } from "./todo";

let payloadApiBaseUrl = ''
apiBaseUrl.subscribe(value => {
	payloadApiBaseUrl = value;
});
export let todos: Array<todo> = [];

export async function categoriesPopulate(userId: number) {
	const categoriesResponse = await fetch(`${payloadApiBaseUrl}/categories`, {
		method: "POST",
		body: JSON.stringify({
			githubId: userId,
		}),
		headers: {
			"content-type": "application/json",
		},
	});
	const categoriesPayload = await categoriesResponse.json();
	categoryList.set(categoriesPayload.payload)
}
export async function addCategory(newCategory: string, userId: number) {
	todos = []
	const response = await fetch(`${payloadApiBaseUrl}/category`, {
		method: 'POST',
		body: JSON.stringify({
			categoryText: newCategory,
			githubId: userId,
		}),
		headers: {
			'content-type': 'application/json',
		},
	})
	let categoryId: number
	if (response.status === 200) {
		const payload = await response.json();
		categoryId = payload.data.categoryId
		categoriesPopulate(userId)    
			.catch(() => {
				console.log('Getting categories failed')
			})
		categoryTEXT.set(newCategory)
		await getToDo(categoryId, userId)
	} else {
		alert('Failed to add category')
	}
}
