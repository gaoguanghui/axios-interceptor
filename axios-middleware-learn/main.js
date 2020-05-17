import axios from './myAxios.js';

const getBtn = document.querySelector('#get');
const postBtn = document.querySelector('#post');

axios.config.baseURL = "http://localhost:9000";

//get请求
getBtn.onclick = (e)=>{
    console.log('eee, ', e.target);
    axios.get("/getData").then(res=>{
        // console.log('get request result = ', res);
        alert(res);
    }).catch(err=>{
        alert('post err -> ', err);
    });
};
//post请求
postBtn.onclick = (e)=>{
    console.log('eee, ', e.target);
    axios.post("/postData").then(res=>{
        // console.log('get request result = ', res);
        alert(res);
    }).catch(err=>{
        alert('post err -> ', err);
    });
};

//请求拦截器 中间件
axios.interceptors.request.use((config) => {
    console.log('interceptors.request1');
    return config;
}, (error) => {
    return Promise.reject(error);
});
axios.interceptors.request.use((config) => {
    console.log('interceptors.request2');
    return config;
}, (error) => {
    return Promise.reject(error);
});
//响应拦截器 中间件
axios.interceptors.response.use((res) => {
    console.log('interceptors.response1');
    return res;
}, (error) => {
    return Promise.reject(error);
});
axios.interceptors.response.use((res) => {
    console.log('interceptors.response2');
    return res;
}, (error) => {
    return Promise.reject(error);
});