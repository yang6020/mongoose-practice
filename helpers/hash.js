const crypto = require('crypto');

const hashingSecret = 'thisIsASecret';

const helpers = {};
helpers.hash = str => {
  if (typeof str == 'string' && str.length > 5) {
    const hash = crypto
      .createHmac('sha256', hashingSecret)
      .update(str)
      .digest('hex');
    return hash;
  } else {
    return false;
  }
};

module.exports = helpers;
