import client from './config';

const login = async (email, password) => {
    const loginRes = await client.post('/user/login', {
        'email': email,
        'password': password,
    });
    return(loginRes.data);
}

const verifyUser = async (userId, token) => {
    const verifyRes = await client.get('/user/verify', {
        params: {
            'userId': userId,
            'token': token,
        }
    });
    return(verifyRes.data);
}

const register = async (userData) => {
    const registerRes = await client.post('/user', userData);
    return(registerRes.data)
}

const getActivities = async (useId, token, page=0, activitiesFilter) => {
    const getActivitiesRes = await client.get('/history', {
        params: {
            'userId': useId,
            'token': token,
            'page': page,
            'activitiesFilter': activitiesFilter
        }
    });
    return getActivitiesRes.data;
}

const addActivity = async (userId, token, addData) => {
    const addActivityRes = await client.post('/history', {
        'userId': userId,
        'token': token,
        'addData': addData,
    });
    return addActivityRes.data;
}

const removeActivity = async (userId, token, removeId) => {
    const removeActivityRes = await client.delete('/history', {
        data: {
            'userId': userId,
            'token': token,
            'removeId': removeId,
        }
    });
    return removeActivityRes.data;
}

const updateActivity = async (userId, token, activityId, updateData) => {
    const updateActivityRes = await client.put('/history', {
        'userId': userId,
        'token': token,
        'activityId': activityId,
        'data': updateData
    });
    return updateActivityRes.data;
}

const getSummary = async (userId, token) => {
    const getSummaryRes = await client.get('/history/summary', {
        params: {
            'userId': userId,
            'token': token
        }
    });
    return getSummaryRes
}

export { 
    login, 
    register, 
    getActivities, 
    addActivity, 
    removeActivity,
    updateActivity,
    verifyUser,
    getSummary
 };