import type { RequestHandler } from '@sveltejs/kit';

export const get = async (request: RequestHandler) => {
	request.locals.userName = { userName: null };
	request.locals.userId = { userId: null };

	return {
		status: 302,
		headers: {
			location: '/',
			'set-cookie': [
				`userName=; expires=Thu, 18 Dec 2013 12:00:00 UTC; Path=/; HttpOnly`,
				`userId=; expires=Thu, 18 Dec 2013 12:00:00 UTC; Path=/; HttpOnly`
			]
		}
	};
}
