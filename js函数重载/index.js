function createOverload() {
  const fnMap = new Map();
  function overload(...args) {
    const key = args.map((param) => typeof param).join(",");
    const fn = fnMap.get(key);
    if (!fn) {
      throw Error("没有找到对应实现");
    }
    return fn.apply(this, args);
  }
  overload.add = function (...args) {
    const fn = args.pop();
    if (typeof fn !== "function") {
      throw Error("最后一个参数必须为函数");
    }
    const key = args.join(",");
    fnMap.set(key, fn);
  };
  return overload;
}

const getUser = createOverload();

getUser.add(() => {
  console.log("查询所有用户");
});

const queryUserPage = (name, size = 10) => {
  console.log(`查询name为${name}的用户，一页${size}条`);
};
getUser.add("string", queryUserPage);
getUser.add("string", "number", queryUserPage);

getUser.add("number", (size) => {
  console.log(`查询前${size}位用户`);
});

getUser();
getUser("张三");
getUser("李四", 12);
getUser(20);
