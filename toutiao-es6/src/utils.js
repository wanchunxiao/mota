/**
 *  @desc网络请求封装，项目  内请走这个封装 
 */


export const request = params=>{
    let requestParams={
        ...params,
        method:(params.method&&params.method.toUpperCase())||'GET'
    }
    return fetch(requestParams.url,requestParams)
            .then(res=>res.json)
}