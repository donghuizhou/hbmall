import axios from 'axios'

let env = process.env.NODE_ENV || 'development'

export const baseUrl = env === 'development' ? 'http://192.168.31.121:3000'
  : 'http://hb.zhoudonghui.cn'

export let getProd = params => axios.get(baseUrl + '/hb/getProd', { params })
