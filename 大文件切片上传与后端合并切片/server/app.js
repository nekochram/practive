//后端这边还有bug，前端上传完切片请求后端/merge接口通知合并切片的时候会出问题，应该是读写的流程上有问题，后端还没接收完所有文件就开始合并，出现了问题
const express = require("express");
const multiparty = require("multiparty");
const app = express();
const port = 3000;
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const uploadDir = "./chunks";

const writeWithStreamLoop = (fileList, ws, sourceFile) => {
  if (fileList.length == 0) {
    ws.close();
    return;
  }
  const currentFile = path.resolve(sourceFile, fileList.shift());
  const rs = fs.createReadStream(currentFile);
  rs.pipe(ws, { end: false });
  rs.on("end", () => {
    fs.unlink(currentFile, (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
    writeWithStreamLoop(fileList, ws, sourceFile);
  });
};

const mergeChunks = (filename, sourceFile) => {
  const fileList = fs.readdirSync(sourceFile);
  const reg = /-(.*?)\./;
  fileList.sort((a, b) => {
    return a.match(reg)[1] - b.match(reg)[1];
  });
  const ws = fs.createWriteStream(`${sourceFile}/${filename}`);
  writeWithStreamLoop(fileList, ws, sourceFile);
};

app.use(bodyParser.json())

app.all("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.status = 200;
    res.end();
    return;
  }
  next();
});

app.post("/upload", (req, res) => {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdir(uploadDir, (err) => {
      if (err) {
        console.log(err);
        res.statusCode = 500;
        res.end("上传失败");
        return;
      }
    });
  }
  const form = new multiparty.Form({
    uploadDir,
  });
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
      res.statusCode = 500;
      res.end("上传失败");
      return;
    }
    const { index, hash, filename } = fields;
    const [name, suffix] = filename[0].split(".");
    const newPath = `${uploadDir}/${name}-${index}.${suffix}`;
    const oldPath = `${uploadDir}/${files.file[0].path.split("\\")[1]}`;
    //重命名为真实文件名
    fs.rename(oldPath, newPath, function (err) {
      if (err) {
        console.log("rename error: " + err);
        res.status(500).end("{'status':500, 'message': '上传失败！'}");
      } else {
        res.status(200).end("{'status':200, 'message': '上传成功！'}");
      }
    });
  });
});

//前端通知合成
app.post("/merge", urlencodedParser,(req, res) => {
  const { filename } = req.body;
  try {
    mergeChunks(filename, uploadDir);
  } catch (error) {
    res.status(500).end("{'status':500, 'message': '上传失败！'}");
  } finally {
    res.status(200).end("{'status':200, 'message': '上传成功！'}");
  }
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
