import api from './api'

// 获取 JSSDK 配置信息
const jssdkConfig = param => {
    return api.get('/member/get-config', param)
}

// 获取验证码
const getCode = param => {
    return api.post('/send-code/send', param)
}

// 检验验证码，绑定手机号
const checkCode = param => {
    return api.post('/member/bind', param)
}

// 获取推荐人数和奖金
const getRecommend = param => {
    return api.post('/welfare/my-recommend', param)
}

// 判断是否授权
const isAuthorization = param => {
    return api.post('/member/authorize', param)
}

// 奖学金列表
const getTickerList = param => {
    return api.post('/welfare/scholarship-my', param)
}

// 领取奖励金
const getReward = param => {
    return api.post('/welfare/get-coupon', param)
}

// 用户创建奖励金
const createReward = param => {
    return api.jsonP('http://order.limiketang.com/limi-math-phone/scholarship-add', param)
}

// 重置绑定信息（暂时不用）
const reBind = param => {
    return api.post('/member/reset-bind', param)
}

export default{
    jssdkConfig,
    getCode,
    checkCode,
    getReward,
    isAuthorization,
    getTickerList,
    createReward,
    getRecommend,
    reBind
}
