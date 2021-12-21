import {isFunction as _isFunction, isNumber as _isNumber, isString as _isString,} from 'lodash'
type VALIDATION = 'required' | 'isNumber' | Function | 'isString'
interface KEY {
    key:string,
    valid?: VALIDATION,
    error?: string
}
export type API_KEYS = KEY[]
export const arrFormValidate = (source:string[],apiKeys:API_KEYS) => {
    let output = {} as Record<string,any>
    for(let i = 0; i<source.length; i++){
        apiKeys.forEach((k,index)=>{
            const key =apiKeys[i].key
            const val = source[i]
            const valid = apiKeys[i].valid
            if(valid){
                if(_isFunction(valid)){
                    if(!valid(val)) throw new Error(apiKeys[i].error?apiKeys[i].error:`${key}出现未知验证错误`)
                }else{
                    switch(valid){
                        case 'required':
                          if(!val) throw new Error(apiKeys[i].error?apiKeys[i].error:`${key}是必须填写内容`)
                        break;
                        case 'isNumber': 
                          if(!_isNumber(val)) throw new Error(apiKeys[i].error?apiKeys[i].error:`${key}只接收数字内容`)
                        break;
                        case 'isString':
                          if(!_isString(val)) throw new Error(apiKeys[i].error?apiKeys[i].error:`${key}只接收字符串内容`)
                    }
                }
            }
            output[key] = source[i]
        })
    } 
    return output as Record<string,any>        
}