
const axios = {
    config: {
        url: '/',
        method: 'get',
        baseURL: "",
        params: {},
    }
};
// const axios = (config) => {
//     console.log(config);
//     if (config.error) {
//         return Promise.reject({
//             error: "error in axios"
//         });
//     } else {
//         return Promise.resolve({
//             ...config,
//             result: config.result,
//         });
//     }
// };

// axios({
//     error: "",
//     result: 'jack',
// }).then(res => {
//     console.log('res= ', res);
// }).catch(err => {
//     console.log('err=> ', err);
// });


// function abc(fn1,fn2){
//     console.log('abcccc');

// }

// const fn1 = (config)=>{
//     return config;
// }
// const fn2 = (error)=>{
//     return Promise.reject(error);
// }

// abc(fn1, fn2);

axios.interceptors = {
    request: [],
    response: [],
};

axios.run = (config) => {
    // console.log('config --- ', config);
    const chain = [
        {
            resolved: axios.action,
            rejected: undefined
        }
    ];

    axios.interceptors.request.forEach(interceptor => {
        chain.unshift(interceptor);
    });

    axios.interceptors.response.forEach(interceptor => {
        chain.push(interceptor);
    });

    let promise = Promise.resolve(config);

    while (chain.length) {
        const { resolved, rejected } = chain.shift();
        promise = promise.then(resolved, rejected);
    }

    return promise;
};

axios.interceptors.request.use = (resolved, rejected) => {
    axios.interceptors.request.push({ resolved, rejected });
};
axios.interceptors.response.use = (resolved, rejected) => {
    axios.interceptors.response.push({ resolved, rejected });
};

axios.action = (config) => {
    console.log('ajax请求', config.baseURL+config.url);
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(config.method, config.baseURL + config.url, true);
        xhr.onload = () => {
            // console.log(xhr.status);
            // console.log(xhr.responseText);
            resolve(xhr.responseText);
        };
        xhr.onerror = () => {
            console.log('======== xhr.error');
            reject('xhr error 错误');
        };
        xhr.send();

    });
};

axios.get = (url) => {
    axios.config.method = 'get';
    axios.config.url = url;
    return axios.run(axios.config);
};
axios.post = (url) => {
    axios.config.method = 'post';
    axios.config.url = url;
    return axios.run(axios.config);
};


export default axios;

