// 0-calcul.test.js

const assert = require('assert');
const calculateNumber = require('./0-calcul');

describe('calculateNumber', () => {
  it('should return the correct sum for integers', () => {
    assert.strictEqual(calculateNumber(1, 3), 4);
  });

  it('should return the correct sum when one number is decimal', () => {
    assert.strictEqual(calculateNumber(1, 3.7), 5);
  });

  it('should return the correct sum when both numbers are decimal', () => {
    assert.strictEqual(calculateNumber(1.2, 3.7), 5);
    assert.strictEqual(calculateNumber(1.5, 3.7), 6);
  });
});
