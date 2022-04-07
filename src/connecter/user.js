import client from './config';
const ApiUri = 'http://localhost:4000/';

const login = async (email, password) => {
    const loginRes = await client.get('/user/login', {
        params: {
            'email': email,
            'password': password,
        }
    });
    return(loginRes.data);
}

const register = async (userData) => {
    const registerRes = await client.post('/user', userData);
    return(registerRes.data)
}

const getHistories = async (useId, session, page) => {
    console.log('get');
    const getHistoriesRes = await client.get('/history', {
        params: {
            'userId': useId,
            'session': session,
            'page': page
        }
    });
    return getHistoriesRes.data;
}

export { login, register, getHistories };