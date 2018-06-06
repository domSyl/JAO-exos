const blockchain = require('./blockchain');
const { BlockChainUtils }  = require('./BlockChainUtils');
const path = require('path');

blockchain.add('Alice gives 5 dollars to Bob.');
blockchain.add('Bob gives 3 dollars to Charly.');

BlockChainUtils.save(blockchain, path.resolve(__dirname, 'blockchain.log'));


