const target = 'https://github.com/login/oauth/authorize';
const clientId = import.meta.env.VITE_CLIENT_ID;
export const get = async () => {
	const sessionId = '123';
	return {
		status: 302,
		headers: {
			location: `${target}?client_id=${clientId}&state=${sessionId}`
		}
	};
}
