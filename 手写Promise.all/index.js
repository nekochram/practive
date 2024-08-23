Promise.myAll=function(arr){
  let res,rej
  let i=0
  let finishNum=0
  let result=[]
  const p=new Promise((resolve,reject)=>{
    res=resolve
    rej=reject
  })
  for(const x of arr){
    let index=i
    i++
    Promise.resolve(x).then(data=>{
      result[index]=data
      finishNum++
      if(finishNum==i){
        res(result)
      }
    },rej)
  }
  if(i==0){
    res([])
  }
  return p
}

Promise.myAll([1,2,3,Promise.reject(123)]).then(res=>{
  console.log(res)
},err=>{
  console.log(err)
})