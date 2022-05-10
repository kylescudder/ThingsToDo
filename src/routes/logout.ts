import type { RequestHandler } from '@sveltejs/kit';

export const get = async (request: RequestHandler) => {
	request.locals.at = { at: null };

	return {
		status: 302,
		headers: {
			location: '/',
			'set-cookie': [
				`at=; expires=Thu, 18 Dec 2013 12:00:00 UTC; Path=/; HttpOnly`
			]
		}
	};
}
