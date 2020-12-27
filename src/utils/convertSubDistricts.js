const subDistrictsJson = require('./sub-districts.json');
const subDistrictsJson2 = require('./sub-districts2.json');
const fs = require('fs');

// const newSubDistricts = subDistrictsJson.map((el) =>
//   el.sub_district.replace(
//     /(^\w|\s\w)(\S*)/g,
//     (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase(),
//   ),
// );

// fs.writeFileSync('sub-districts2.json', JSON.stringify(newSubDistricts));

console.log(subDistrictsJson.length); // 6642
console.log(subDistrictsJson[0]);
console.log(subDistrictsJson2.length);
console.log(subDistrictsJson2[0]);
