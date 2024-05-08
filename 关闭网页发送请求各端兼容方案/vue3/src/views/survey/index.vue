<template>
  <div>
    <a href="https://www.baidu.com">去百度</a>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onUnmounted, onMounted } from 'vue';

//vue的onBeforeUnmount和onUnmounted内写关闭页面发送请求是行不通的，完全没用

// 基础三个页面关闭事件触发的顺序，beforeunload->pagehide->unload

//beforeunload的二次确认不可靠，有时候即使写了event.preventDefault()也不会出现二次确认弹窗，但是后续的方法还是会继续触发，并且只有pc和安卓会有二次弹窗

// window.onbeforeunload/body上的onbeforeunload 与 body上的onunload/window.onunload 这两对是互斥的，谁后写最后触发的是谁

//如果想刷新的时候不触发onbeforeunload https://blog.csdn.net/l791444672/article/details/48173647
// window.onbeforeunload = function () {
//   var n = window.event.screenX - window.screenLeft;
//   var b = n > document.documentElement.scrollWidth - 20;
//   if (b && window.event.clientY < 0 || window.event.altKey) {
//     // 是关闭而非刷新"
//     window.event.returnValue = "是否关闭？";
//   } else {
//     // 是刷新而非关闭
//   }
// }


// PC chrome
// 第一次进入页面:visibilitychange(visible)
// 页面刷新:onbeforeunload/body-onbeforeunload beforeunload (二次弹窗确认后，或者不写二次弹窗) visibilitychange(hidden) body-onunload/onunload pagehide unload
// 跳转去新页面(包括返回浏览器主页):body-onbeforeunload/onbeforeunload beforeunload (二次弹窗确认后，或者不写二次弹窗) visibilitychange(hidden) body-onunload/onunload pagehide unload
// 从新页面跳转回来(包括打开浏览器时自动进入该页面):无
// 从当前页面返回至上一个页面:body-onbeforeunload/onbeforeunload beforeunload (二次弹窗确认后，或者不写二次弹窗) visibilitychange(hidden) body-onunload/onunload pagehide unload
// 切换tab:visibilitychange
// 关闭tab:body-onbeforeunload/onbeforeunload beforeunload (此时如果触发了二次弹窗,点击任意按钮后就还会触发visibilitychange(visible)) visibilitychange(hidden) body-onunload/onunload pagehide unload
// 关闭浏览器(正在查看的页面为此页面):body-onbeforeunload/onbeforeunload beforeunload (二次弹窗确认后，或者不写二次弹窗) body-onunload/onunload visibilitychange(hidden) pagehide unload
// 关闭浏览器(正在查看的页面不是此页面):body-onbeforeunload/onbeforeunload beforeunload (此时如果触发了二次弹窗,点击任意按钮后就还会触发visibilitychange(visible),并且点击确认后还会触发visibilitychange(hidden)) (二次弹窗确认后，或者不写二次弹窗) body-onunload/onunload pagehide unload
// 浏览器切换到后台(视口被完全遮挡不可见同理):visibilitychange(hidden)

// PC edge
// 第一次进入页面:无
// 页面刷新:body-onbeforeunload/onbeforeunload beforeunload (二次弹窗确认后，或者不写二次弹窗) visibilitychange(hidden) body-onunload/onunload pagehide unload
// 跳转去新页面(包括返回浏览器主页):body-onbeforeunload/onbeforeunload beforeunload (二次弹窗确认后，或者不写二次弹窗) visibilitychange(hidden) body-onunload/onunload pagehide unload
// 从新页面跳转回来(包括打开浏览器时自动进入该页面):无
// 从当前页面返回至上一个页面:body-onbeforeunload/onbeforeunload beforeunload (二次弹窗确认后，或者不写二次弹窗) visibilitychange(hidden) body-onunload/onunload pagehide unload
// 切换tab:visibilitychange
// 关闭tab:body-onbeforeunload/onbeforeunload beforeunload (此时如果触发了二次弹窗,点击任意按钮后就还会触发visibilitychange(visible)) visibilitychange(hidden) body-onunload/onunload pagehide unload
// 关闭浏览器(正在查看的页面为此页面):body-onbeforeunload/onbeforeunload beforeunload (二次弹窗确认后，或者不写二次弹窗) body-onunload/onunload visibilitychange(hidden) pagehide unload
// 关闭浏览器(正在查看的页面不是此页面):body-onbeforeunload/onbeforeunload beforeunload (此时如果触发了二次弹窗,点击任意按钮后就还会触发visibilitychange(visible),并且点击确认后还会触发visibilitychange(hidden)) (二次弹窗确认后，或者不写二次弹窗) body-onunload/onunload pagehide unload
// 浏览器切换到后台(视口被完全遮挡不可见同理):visibilitychange(hidden)

// Android原生浏览器
// 第一次进入页面(包括打开浏览器时自动进入该页面):无
// 页面刷新:body-onbeforeunload/onbeforeunload beforeunload visibilitychange(hidden) body-onunload/onunload pagehide unload
// 跳转去新页面(包括返回浏览器主页):visibilitychange(hidden) pagehide
// 从新页面跳转回来:visibilitychange(visible)
// 从当前页面返回至上一个页面:visibilitychange(hidden) pagehide
// 切换tab:visibilitychange
// 关闭tab:visibilitychange(hidden) body-onunload/onunload pagehide unload
// 关闭浏览器(正在查看的页面为此页面):无 将浏览器缩放到任务列表的时候会触发visibilitychange(hidden)
// 关闭浏览器(正在查看的页面不是此页面):无
// 浏览器切换到后台:visibilitychange(hidden)
// 锁屏或息屏:visibilitychange(hidden)

// Android 微信webview
// 第一次进入页面:无
// 页面刷新:body-onbeforeunload/onbeforeunload beforeunload visibilitychange(hidden) body-onunload/onunload pagehide unload
// 跳转去新页面:body-onbeforeunload/onbeforeunload beforeunload visibilitychange(hidden) body-onunload/onunload pagehide unload
// 从新页面跳转回来:无
// 关闭页面:visibilitychange(hidden) body-onunload/onunload pagehide unload
// 关闭微信:缩放到任务列表的时候会触发visibilitychange(hidden) 上滑关闭微信后触发body-onunload/onunload pagehide unload
// 微信切换到后台:visibilitychange(hidden)
// 锁屏或息屏:visibilitychange(hidden)

// ios safari
// 第一次进入页面(包括打开浏览器时自动进入该页面):无
// 页面刷新:visibilitychange(hidden) body-onunload/onunload pagehide unload
// 跳转去新页面(包括返回浏览器主页):visibilitychange(hidden) pagehide
// 从新页面跳转回来:visibilitychange(visible) pagehide unload visibilitychange(hidden) body-onunload/onunload
// 从当前页面返回至上一个页面:visibilitychange(hidden) pagehide
// 切换tab:visibilitychange
// 关闭tab:visibilitychange(hidden) body-onunload/onunload pagehide unload
// 关闭浏览器(正在查看的页面为此页面):无
// 关闭浏览器(正在查看的页面不是此页面):无
// 浏览器切换到后台(正在查看的页面为此页面):visibilitychange(hidden)
// 浏览器切换到后台(正在查看的页面不是此页面):无
// 锁屏或息屏:visibilitychange(hidden)

// ios 微信webview
// 第一次进入页面:无
// 页面刷新:visibilitychange(hidden) body-onunload/onunload unload pagehide
// 跳转去新页面:visibilitychange(hidden) pagehide
// 从新页面跳转回来:visibilitychange(visible) pagehide visibilitychange(hidden) body-onunload/onunload unload
// 关闭页面:这四个都不太稳定 pagehide还凑活概率大点 pagehide visibilitychange(hidden) body-onunload/onunload unload
// 关闭微信:无
// 微信切换到后台:visibilitychange(hidden)
// 锁屏:visibilitychange(hidden)


//总结 vue项目
//beforeunload和window.onbeforeunload还是就写个event.preventDefault()算了，请求放到onunload里去好一点
//PC可以用 window.onunload pagehide unload
//移动端可以用 visibilitychange(hidden) pagehide window.onunload unload
//移动端最好用 pagehide，另外再结合 visibilitychange好一点，再用上PC的window.onunload unload也行，使用visibilitychange可以判断到切换tab，若是后面发现document.visibilityState又变成visible就说明页面没关闭实际上只是切换了tab，可以再发个请求给后端重置下状态.ios的safari直接关闭safari的话无解，但很少人这么干，强行妥协

//window.onunload和unload window.onbeforeunload和beforeunload这两对其实写一组就行

//可以直接复制以下注释里的代码去用
// window.addEventListener("beforeunload", (event) => {
//   event.preventDefault()
// })
// window.addEventListener("pagehide", () => questByFetch("pagehide"))//要写成函数，addEventListener接受的是函数
// window.addEventListener("unload", () => questByFetch("unload"))

// if (/iPhone|iPad|iPod/i.test(navigator.userAgent) || /(Android)/i.test(navigator.userAgent)) {
//   document.addEventListener("visibilitychange", () => {
//     if (document.visibilityState !== "visible") {
//       questByFetch(`visibilitychange ${document.visibilityState}`)
//     } else {
//       // 如果界面又显示了，说明没有关闭，重置标志位
//       alreadySend = false;
//     }
//   })
// }

const alreadySend = false //可以通过这个标识来让方法只执行一次
const questByFetch = (way) => {
  // if (alreadySend) {
  //   return
  // }
  // alreadySend=true
  fetch("http://192.168.4.33:3000/close", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ way }),
    // 保持连接
    keepalive: true,
  })
}

//添加监听器
const addListener = () => {
  window.onbeforeunload = function (event) {
    event.preventDefault()
    questByFetch("onbeforeunload")
  }
  window.onunload = function () {
    questByFetch("onunload")
  }
  window.addEventListener("beforeunload", (event) => {
    event.preventDefault()
    questByFetch("beforeunload")
  })
  window.addEventListener("pagehide", () => questByFetch("pagehide"))//要写成函数，addEventListener接受的是函数
  window.addEventListener("unload", () => questByFetch("unload"))

  // if (/iPhone|iPad|iPod/i.test(navigator.userAgent) || /(Android)/i.test(navigator.userAgent)) {
  document.addEventListener("visibilitychange", () => {
    // if (document.visibilityState !== "visible") {
    questByFetch(`visibilitychange ${document.visibilityState}`)
    // }
  })
  // }
}


onMounted(() => {
  addListener()
})

onBeforeUnmount(() => {
  questByFetch("onBeforeUnmount")
})

onUnmounted(() => {
  questByFetch("onUnmounted")
})
</script>