const cache = new Map();
function deepClone(value) {
  if (typeof value !== "object" || value === null) {
    return value;
  }
  if (cache.has(value)) {
    return cache.get(value);
  }
  const result = Array.isArray(value) ? [] : {};
  Object.setPrototypeOf(result, Object.getPrototypeOf(value));
  cache.set(value, result);
  for (const key in value) {
    if (Object.hasOwn(value, key)) {
      result[key] = deepClone(value[key]);
    }
  }
  return result;
}

class people {
  constructor(parameters) {
    this.name = "1";
    this.age = 12;
  }
  speak() {
    console.log("speak");
  }
}
console.log(deepClone(new people()));
