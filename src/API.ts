import axios from "axios";


const API = axios.create({ baseURL: 'http://localhost:8000' });

const userAPI = {
    getToken: async (username: string, password: string) => {
        try {
            console.log(username);

            const result = await API.post('/auth', {
                email: username,
                password
            });

            return result.data;
        } catch (e: any) {
            console.log(e.response.data)
        }
    },
    getUserInfo: async (accessToken: string) => {
        const result = await API.get('/user', {
            headers: {
                'access-token': accessToken
            }
        });

        return result.data;
    }
}

const AccountAPI = {
    getAccountInfo: async (accessToken?: string | null) => {
        const result = await API.get('/account', {
            headers: {
                'access-token': accessToken as string
            }
        });

        return result.data;
    }
}

export { userAPI, AccountAPI };