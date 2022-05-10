import type { RequestHandler } from '@sveltejs/kit';

export const get = async (request: RequestHandler) => {
	const code = request.url.searchParams.get('code');
	request.locals.at = code;
	return {
		status: 302,
		headers: {
			location: '/',
			'set-cookie': [
				`at=${code || ''}; Path=/; HttpOnly`
			]
		}
	};
}