import { computed } from "vue";
export default function useComputed(fn){
  const cache=new Map()
  function compare(arg1,arg2){
    return arg1.length === arg2.length && arg1.every((item,index)=>Object.is(item,arg2[index]))
  }
  function getCache(arg){
    const keys=[...cache.keys()]
    return keys.find(key=>compare(key,arg))
  }
  return (...arg)=>{
    const hasCache=getCache(arg)
    if(hasCache){
      return cache.get(hasCache).value
    }
    debugger
    const newValue=computed(()=>fn(...arg))
    cache.set(arg,newValue)
    return newValue.value
  }
}