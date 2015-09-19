var getBabelRelayPlugin = require('babel-relay-plugin');
var schema = require('../src/data/schema.json');
var plugin = getBabelRelayPlugin(schema.data);

module.exports = plugin
