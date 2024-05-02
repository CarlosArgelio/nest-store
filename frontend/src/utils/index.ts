/**
 * Total Price
 * @param {number[]} prices
 * @returns {number} total price
 */

export const totalPrice = (prices: number[]): number => {
  return prices.reduce((a, b) => a + b, 0);
};
