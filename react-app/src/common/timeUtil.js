'use strict'

function getNowTimeStamp() {
  return Date.now();
}

function formatTime(ms) {
  const date = new Date(!ms ? secs * 1000 : ms);
  const month = formatByDigits(date.getMonth() + 1);
  const day = formatByDigits(date.getDate());
  const hours = formatByDigits(date.getHours());
  const minutes = formatByDigits(date.getMinutes());
  const seconds = formatByDigits(date.getSeconds());
  const millisecond = formatByDigits(date.getMilliseconds(), 3);
  return `${date.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}.${millisecond}`;
}

function formatByDigits(number, digits = 2) {
  if (!number) {
    return '000';
  }
  return `00${number}`.slice(-digits);
}

function getNowTime() {
  return formatTime(getNowTime());
}

module.exports = {
  getNowTimeStamp: getNowTimeStamp,
  formatTime: formatTime,
  formatByDigits: formatByDigits,
  getNowTime: getNowTime,
};
