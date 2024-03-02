// TypeError: Converting circular structure to JSON in JS

// EXAMPLE 1 - Use a method to remove all circular references from an object

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

const obj = {
  address: {country: 'Chile'},
  numbers: [1, 2, 3],
  age: 30,
};
obj.name = obj;

// ✅ Works
const result = JSON.stringify(obj, getCircularReplacer());
console.log(result); // 👉️ {"address":{"country":"Chile"},"numbers":[1,2,3],"age":30}

// ------------------------------------------------------------------

// // EXAMPLE 2 - Use the flatted package to resolve circular references

// import {parse, stringify, toJSON, fromJSON} from 'flatted';

// const arr = [{}];
// arr[0].arr = arr;
// arr.push(arr);

// const result = stringify(arr); // [["1","0"],{"a":"0"}]

// console.log(result); // 👉️ [["1","0"],{"arr":"0"}]
