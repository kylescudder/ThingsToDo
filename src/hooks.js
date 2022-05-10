import cookie from 'cookie';

export const handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	event.locals.at = cookies.at;
	const response = await resolve(event);
	response.headers['set-cookie'] = `at=${event.locals.at || ''};  path=/; HttpOnly`;
	return response;
}

export const getSession = async (request) => {
	return {
		at: request.locals.at
	};
}
