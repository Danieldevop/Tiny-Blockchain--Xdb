const SHA256 = require('crypto-js/sha256');
var timestamp = require('time-stamp');

class Block {
    constructor (index, timestamp, data, previousHash = '') {
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculateHash()
    }

    calculateHash () {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString()
    }
}

class Blockchain {
    constructor () {
        this.chain = [this.createGenesisBlock()]
    }

    createGenesisBlock () {
        return new Block (0, '12/21/2017', 'Genesis Block KARMADB-V1.0', '0')
    }

    getLatestBlock () {
        return this.chain[this.chain.length - 1]
    }

    addBlock (newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash
        newBlock.hash = newBlock.calculateHash()
        this.chain.push(newBlock)
    }
}


// proof of the chain

let karmacoin = new Blockchain()
karmacoin.addBlock(new Block(1, timestamp('YYYY/MM/DD:HH:mm:ss'), { amount : 100 }))
karmacoin.addBlock(new Block(2, timestamp('YYYY/MM/DD:HH:mm:ss'), { amount : 4 }))

console.log(JSON.stringify(karmacoin, null, 4))
