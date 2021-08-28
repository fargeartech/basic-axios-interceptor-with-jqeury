axios.interceptors.request.use(function (config) {
    $.blockUI({ message: 'please wait..' });
    return config;
}, function (error) {
    $.unblockUI();
    return Promise.reject(error);
});

axios.interceptors.response.use(async response => {
    // try {
    //     await agent.sleep(1000);
    //     return response;
    // } catch (error) {
    //     console.error(error);
    //     $.unblockUI();
    //     return await Promise.reject(error);
    // }
    await agent.sleep(1000);
    return response;
}, (error) => {
    const { data, status, config } = error.response;
    switch (status) {
        case 400:
            console.log('error 400');
            break;
        case 401:
            console.log('error 401');
            break;
        case 404:
            console.log('error 404');
            break;
        case 500:
            console.log('error 500');
            break;
    }
    $.unblockUI();
    return Promise.reject(error);
})

const responseBody = (response) => response.data;
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';
const agent = {
    sleep: function (delay) {
        return new Promise((resolve) => {
            console.log('enter delay processing..')
            setTimeout(resolve, delay);
        })
    },
    requests: {
        get: (url) => axios.get(url).then(responseBody),
        post: (url, body) => axios.post(url, body).then(responseBody),
        put: (url, body) => axios.put(url, body).then(responseBody),
        del: (url) => axios.delete(url).then(responseBody),
    }
};