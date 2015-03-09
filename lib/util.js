exports.env = function (name) {
  var value = process.env[name];
  if (!value) throw new Error('Required environment variable ' + name + ' not found.');
  return value;
};