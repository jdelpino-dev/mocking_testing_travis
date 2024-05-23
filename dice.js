function rollDice(numSides) {
  if (numSides <= 0) throw new Error("Number of sides must be greater than 0");
  if (typeof numSides !== "number")
    throw new Error("Number of sides must be a number");
  if (numSides % 1 !== 0)
    throw new Error("Number of sides must be an integer");
  return Math.floor(Math.random() * numSides) + 1;
}

export default rollDice;
