import { onMounted, ref } from "vue"
import { debounce as _debounce } from "lodash"
const s = 1000
const countDown = (wait:number,fn:Function) =>{
    const time = ref<number>(wait)
    const finished = ref<boolean>(false)
    let Counter:any
    onMounted(()=> finished.value = true)
    const startCount = _debounce(()=>{
        if(time.value === wait){
             fn()
             finished.value = false
             Counter = setInterval(()=>{
                if(time.value<=0){
                    time.value = wait
                    finished.value = true
                    clearInterval(Counter)
                    return{
                        time,
                        finished 
                    }
                }
                time.value -= s
            },s)
        }else{
            finished.value = false
        }
    },s)
    return{
        time,
        finished,
        startCount
    }
}

export default countDown