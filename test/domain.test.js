/* test/sample-test.js */
const { expect } = require('chai');
// const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
let _nftContract;
let _owner;
let _user1;

async function deployIPFixture() {
  const [owner, addr1, addr2] = await ethers.getSigners();
  const NFT = await ethers.getContractFactory('NFT');
  const nftContract = await NFT.deploy();
  await nftContract.deployed();
  _nftContract = nftContract;
  _owner = owner;
  _user1 = addr1;
}

describe('NFTMarket', async function () {
  beforeEach(async () => {
    await deployIPFixture();
  });
  it('Should mint an NFT', async function () {
    let tx = await _nftContract.createToken('Dcaina');
    await tx.wait();
    expect(await _nftContract.balanceOf(_owner.address)).to.be.eq(1);
  });

  it('can not set a record', async function () {
    await expect(
      _nftContract.connect(_user1).setRecord('RECORD1', 'Dcaina')
    ).to.be.revertedWith('You don not own a minted NFT');
  });

  it('should set a record', async function () {
    let tx = await _nftContract.connect(_user1).createToken('Dcaina');
    await tx.wait();
    tx = await _nftContract.connect(_user1).setRecord('RECORD1', 'Dcaina');
    await tx.wait();
    expect(await _nftContract.getRecord('Dcaina')).to.be.eq('RECORD1');
  });

  it('should get all registers', async function () {
    let tx = await _nftContract.connect(_user1).createToken('Dcaina');
    await tx.wait();
    tx = await _nftContract.connect(_user1).createToken('Dcaina2');
    await tx.wait();
    expect(await _nftContract.getAllRegisters()).to.have.lengthOf(2);
  });

  it('should get an empty array all registers response', async function () {
    expect(await _nftContract.getAllRegisters()).to.have.lengthOf(0);
  });
});
