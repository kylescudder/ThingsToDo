import cookie from 'cookie';

export const handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	event.locals.userName = cookies.userName;
	event.locals.userId = cookies.userId;
	const response = await resolve(event);
	response.headers['set-cookie'] = `userName=${event.locals.userName || ''};  path=/; HttpOnly`;
	response.headers['set-cookie'] = `userId=${event.locals.userId || ''};  path=/; HttpOnly`;
	return response;
}

export const getSession = async (request) => {
	return {
		userName: request.locals.userName,
		userId: request.locals.userId
	};
}
