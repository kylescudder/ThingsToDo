import dayjs from 'dayjs'
export let todos: Array<{
	text: string;
	targetDate: Date;
	targetDateString: string;
	completed: boolean;
	id: number;
	categorieId: number;
}> = [];

export async function getToDo(categoryId: string, apiBaseUrl: string, userId: number) {
	todos = []
	const response = await fetch(`${apiBaseUrl}/todo`, {
		method: "POST",
		body: JSON.stringify({
			githubId: userId,
			categorieId: categoryId
		}),
		headers: {
			"content-type": "application/json",
		},
	});
	if (response.status === 200) {

		const payload = await response.json();
		todos = payload.data;
		if (todos !== undefined) {
			todos.forEach(todo => {
				todo.targetDateString = dayjs(todo.targetDate).format('DD/MM/YYYY HH:mm')
			});
		}
	}
	return todos;
}