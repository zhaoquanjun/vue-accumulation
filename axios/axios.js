
import axios from 'axios'

import qs from 'qs'
import originJSONP from 'jsonp'

let cancel = {}
let promiseArr = {}
const CancelToken = axios.CancelToken

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL = 'http://api.service.account.limiketang.com' // 接口地址（后端API接口地址）

axios.interceptors.request.use(config => {
// 发起请求时，取消掉当前正在进行的相同请求
if (promiseArr[config.url]) {
    promiseArr[config.url]('操作取消')
    promiseArr[config.url] = cancel
} else {
    promiseArr[config.url] = cancel
}
return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(response => {
    return response
}, error => {
    return Promise.resolve(error.response)
})

export default {
    get (url, param) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url,
                params: param,
                cancelToken: new CancelToken(c => {
                    cancel = c
                })
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
post (url, param) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            url,
            data: qs.stringify(param),
            cancelToken: new CancelToken(c => {
                cancel = c
            })
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
},
jsonP (url, param) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + this.formatParam(param)
    return new Promise((resolve, reject) => {
        originJSONP(url, (err, param) => {
            if (!err) {
                resolve(param)
            } else {
                reject(err)
            }
        })
    })
},
formatParam (data) {
    let url = ''
    for (let key in data) {
        let value = data[key] !== undefined ? data[key] : ''
        url += `&${key}=${encodeURIComponent(value)}`
    }
    return url ? url.substring(1) : ''
    }
}






