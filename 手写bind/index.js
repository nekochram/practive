function method(a, b, c, d) {
  console.log("method run");
  console.log("args:", a, b, c, d);
  console.log("this:", this);
  return 123;
}

Function.prototype.myBind = function (ctx, ...args) {
  const fn = this;
  return function (...subArgs) {
    const allArgs = [...args, ...subArgs];
    if (new.target) {
      return new fn(...allArgs);
    } else {
      return fn.apply(ctx, allArgs);
    }
  };
};

const newFn = method.myBind("ctx", 1, 2, 3);
console.log(newFn(4));
console.log(new newFn(4));
