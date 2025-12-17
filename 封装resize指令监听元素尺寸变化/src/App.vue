<template>
  <div class="container">
    <h2>可缩放方块演示</h2>
    <div class="resizable-box" v-size-ob="handleResize">
      <p>拖拽右下角的控制点来调整尺寸</p>
    </div>
  </div>
</template>

<script setup name="App">
const handleResize = (size) => {
  console.log(size);
};
</script>

<style scoped>
.container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.resizable-box {
  width: 200px;
  height: 200px;
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  border: 2px solid #333;
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  color: white;
  font-weight: bold;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  resize: both;
  overflow: hidden;
  min-width: 100px;
  min-height: 100px;
}

.resizable-box:hover {
  border-color: #666;
}

.resizable-box p {
  margin: 0;
  pointer-events: none;
}
</style>
