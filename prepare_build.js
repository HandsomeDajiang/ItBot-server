const path = require('path');
const fs = require('fs');

function fixNumber(num, length) {
  return ('' + num).length < length
    ? (new Array(length + 1).join('0') + num).slice(-length)
    : '' + num;
}

function getBuildTime() {
  const date = new Date(Date.now() + 8 * 60 * 60 * 1000);
  return (
    fixNumber(date.getFullYear(), 2) +
    (date.getUTCMonth() + 1) +
    fixNumber(date.getUTCDate(), 2) +
    fixNumber(date.getUTCHours(), 2)
  );
}

// set built time
const index = path.join(__dirname, 'src/pages/video-call/index.tsx');
let aboutContent = fs.readFileSync(index, 'utf8');
aboutContent = aboutContent.replace(
  /built on 2022/,
  'built on ' + getBuildTime(),
);
fs.writeFileSync(index, aboutContent);
