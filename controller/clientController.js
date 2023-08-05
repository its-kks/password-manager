const path = require('path');

const login = (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
};

const renderData = (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public', 'userData.html'));
};

module.exports = {
  login,
  renderData
};
