import axios from "axios";

const API = axios.create({baseURL: 'http://localhost:8000'});

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
    },
    createUser: async (email: string, password: string, name: string) => {
        const result = await API.post('/user', {
            email,
            password,
            name
        });

        return result.data;
    }
}

const AccountAPI = {
    getAccountInfo: async (date: string, accessToken?: string | null) => {
        try {
            const result = await API.get('/account', {
                headers: {
                    'access-token': accessToken as string
                },
                params: {
                    date
                }
            });

            return result.data;
        } catch (e: any) {
            console.log(e.response)
        }
    },
    getMonthAccountInfo: async (data: Record<string, any>, accessToken?: string | null) => {
        const result = await API.get('/account', {
            headers: {
                'access-token': accessToken as string
            },
            params: {
                monthly: true,
                date: data.date
            }
        });

        return result.data;
    },
    getAllMonthAccountInfo: async (accessToken?: string | null) => {
        try {
            const result = await API.get('/account', {
                headers: {
                    'access-token': accessToken as string
                },
                params: {
                    monthly: true,
                    entire: true
                }
            });

            return result.data;
        } catch (e: any) {
            console.log(e.response)
        }
    },
    createAccount: async (data: Record<string, any>, accessToken: string | null) => {
        try {
            await API.post('/account', {
                ...data,
                date: data.date
            }, {
                    headers: {
                        'access-token': accessToken as string
                    }
                });
        } catch (e: any) {
            console.log(e)
        }
    }
}

const InitAPI = {
    initAccount: async (data: Record<string, any>, accessToken: string | null) => {
        try {
            await API.post('/init', {
                ...data,
                date: data.date.toISOString().slice(0, 10)
            },{
                headers: {
                    'access-token': accessToken as string
                }
            });
        } catch (e: any) {
            console.log(e.response)
        }
    }
}

export {userAPI, AccountAPI, InitAPI};