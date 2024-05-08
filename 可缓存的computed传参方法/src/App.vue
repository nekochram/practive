<template>
  <div>
    <table border="1">
      <tr>
        <th>商品名称</th>
        <th>价格</th>
        <th>数量</th>
        <th>总价</th>
      </tr>
      <tr v-for="item in list" :key="item.price">
        <td>{{ item.name }}</td>
        <td>{{ item.price }}</td>
        <td>
          <button @click="item.num--">-</button>
          <span>{{ item.num }}</span>
          <button @click="item.num++">+</button>
        </td>
        <td>{{ totalPrice(item) }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import useComputed from './utils/useComputed';
const list = reactive([
  { name: '商品1', price: 1, num: 2 },
  { name: '商品2', price: 2, num: 1 },
  { name: '商品3', price: 3, num: 4 },
  { name: '商品4', price: 4, num: 3 },
])
const totalCost = (item) => {
  console.log("重新计算")
  return item.num * item.price
}
const totalPrice = useComputed(totalCost)
</script>