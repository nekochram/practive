import "./spark-md5.min.js";
function createChunk(file, index, chunkSize) {
  return new Promise((resolve, reject) => {
    const start = index * chunkSize;
    const end = start + chunkSize;
    const spark = new SparkMD5.ArrayBuffer();
    const reader = new FileReader();
    const fileSlice=file.slice(start, end)
    reader.onload = (e) => {
      spark.append(e.target.result);
      resolve({
        start,
        end,
        index,
        hash: spark.end(),
        filename:file.name,
        file:fileSlice
      });
    };
    reader.readAsArrayBuffer(fileSlice);
  });
}
onmessage = async (e) => {
  const { file, startIndex, endIndex, CHUNK_SIZE } = e.data;
  const promises = [];
  for (let i = startIndex; i < endIndex; i++) {
    promises.push(createChunk(file, i, CHUNK_SIZE));
  }
  const chunks = await Promise.all(promises);
  postMessage(chunks);
};
