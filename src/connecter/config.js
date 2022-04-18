import axios from "axios";

const client = axios.create({
    baseURL: 'https://tenrun-server.vercel.app/api',
    validateStatus: () => true,
});

export default client;