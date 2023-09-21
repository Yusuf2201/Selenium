const { expect } = require('chai');
const visualTesting = require('./TestVisual/main'); 

describe('Visual Tests', function () {
  // Your 'before' and 'after' hooks can go here if needed

  it('should match the existing screenshot for SignUpShopee', async function () {
    await visualTesting('SignUpShopee');
  });

  it('should match the existing screenshot for MieIndofood', async function () {
    await visualTesting('MieIndofood');
  });

  it('should match the existing screenshot for PT Pama', async function () {
    await visualTesting('pama');
  });

  it('should match the existing screenshot for Bakpia', async function () {
    await visualTesting('bakpia');
  });

  it('should match the existing screenshot for KAI', async function () {
    await visualTesting('kai');
  });

});
