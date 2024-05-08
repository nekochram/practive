<template>
  <div>
    <button @click="openSurvey">打开新页面</button>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router"
const router=useRouter()
const openSurvey=()=>{
  const { href } = router.resolve({
    path: `/survey`
  });
  window.open(href, "_blank");
}
</script>