const NodeCache = require('node-cache');
const cache = new NodeCache();

module.exports = {
  get: (key) => cache.get(key),
  set: (key, value, ttl = 60) => cache.set(key, value, ttl)
};
