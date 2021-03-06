function reverseNum(obj) {
  var res = {};

  Object.keys(obj).forEach(function(key) {
    var val = this[key];
    res[val] = key | 0;
  }, obj);

  return res;
}

exports.page = {
  size: 1 * 1024 * 1024,
  markingBits: 4,
  markingBit: 1 << 3
};

exports.space = {
  blockSize: exports.page.size * 32
};

exports.scope = {
  size: 8
};

exports.object = {
  maxTries: 7
};
