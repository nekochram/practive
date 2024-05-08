const container=document.querySelector(".container")
const ul=document.querySelector(".li-container")
const audio=document.querySelector("audio")
const dict=lrc.split('\n').map(line=>{
  let arr=line.split(']')
  let timeStr=arr[0].substring(1).split(":")
  return {
    time:Number(timeStr[0]) * 60 + Number(timeStr[1]),
    text:arr[1]
  }
})

function createLiElements (){
  const dom=document.createDocumentFragment()
  for(let i=0;i<dict.length;i++){
    let li=document.createElement("li")
    li.textContent=dict[i].text
    dom.appendChild(li)
  }
  ul.appendChild(dom)
}

createLiElements()

const containerHeight=container.clientHeight
const liHeight=ul.children[0].clientHeight
const maxOffset=ul.clientHeight - containerHeight

function findIndex(time=0){
  const index=dict.findIndex(item=>item.time > time)
  const realIndex=(~index)?(index - 1):(dict.length - 1)
  const activeLi=document.querySelector("li.active")
  const needActiveLi=ul.children[realIndex]
  needActiveLi.scrollIntoView({ behavior: "smooth", block: "center"})
  // const offsetY=realIndex * liHeight - containerHeight/2 + liHeight/2
  // if(offsetY>0){
  //   ul.style.transform=`translateY(-${offsetY>maxOffset?maxOffset:offsetY}px)`
  // }
  if(activeLi){
    activeLi.classList.remove("active")
  }
  if(needActiveLi){
    needActiveLi.classList.add("active")
  }
}

audio.addEventListener("timeupdate",(e)=>{findIndex(e.target.currentTime)})