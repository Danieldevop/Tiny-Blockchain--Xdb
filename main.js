const SHA256 = require('crypto-js/sha256');
var timestamp = require('time-stamp');

class Block {
    constructor (index, timestamp, data, previousHash = '') {
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculateHash()
        this.nonce = 0
    }

    calculateHash () {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString()
    }

    mineBlock (difficulty) {
       while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++
            this.hash = this.calculateHash()
       } 

       console.log(`Block mined: ${this.hash}`)
    }
}

class Blockchain {
    constructor () {
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 3
    }

    createGenesisBlock () {
        return new Block (0, '12/21/2017', 'Genesis Block x-db-V1.0', '0')
    }

    getLatestBlock () {
        return this.chain[this.chain.length - 1]
    }

    addBlock (newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash
        // newBlock.hash = newBlock.calculateHash()
        newBlock.mineBlock(this.difficulty)
        this.chain.push(newBlock)
    }

    //verifying the integrity
    isChainValid () {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i-1]

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false 
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false
            }
        }

        return true
    }
}


// proof of the chain

let karmacoin = new Blockchain()

console.log('Mining Block 1...')
karmacoin.addBlock(new Block(1, timestamp('YYYY/MM/DD:HH:mm:ss'), { amount : 100 }))
console.log('Mining Block 2...')
karmacoin.addBlock(new Block(2, timestamp('YYYY/MM/DD:HH:mm:ss'), { amount : 4 }))

// console.log(`Is Blockchain valid? ${karmacoin.isChainValid()}`)


// adding a infected block

// karmacoin.chain[1].data = { ammount: 200 }
// karmacoin.chain[1].hash = karmacoin.chain[1].calculateHash();

// console.log(JSON.stringify(karmacoin, null, 4))


// console.log(`Is Blockchain valid? ${karmacoin.isChainValid()}`)


