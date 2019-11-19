// @flow

type Checks =
  | { lower: boolean }
  | { upper: boolean }
  | { number: boolean }
  | { symbol: boolean };

const randomFunc: {
  lower(): string,
  upper(): string,
  number(): string,
  symbol(): string
} = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
};

/**
 * Returns a random lower case alphabetical char
 * @returns {String}
 */
function getRandomLower(): string {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

/**
 * Returns a random upper case alphabetical char
 * @returns {String}
 */
function getRandomUpper(): string {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

/**
 * Returns a random digit betweem 0 and 9, including 0 and 9
 * @returns {String}
 */
function getRandomNumber(): string {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

/**
 * Returns one of this special character: !@#$%^&*(){}[]=<>/,.
 */
function getRandomSymbol() {
  const symbols: string = '!@#$%^&*(){}[]=<>/,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
}

/**
 * Generate a random char depending on the valoes of [typesArr]
 *
 * @param {Array.<Check>} typesArr
 * @param {number} typesCount
 */
function generateRandomChar(
  typesArr: Array<Checks>,
  typesCount: number
): string {
  const funcName: string = Object.keys(
    typesArr[Math.floor(Math.random() * typesCount)]
  )[0];

  return randomFunc[funcName]();
}

/**
 *  Generate a password taking in consideration the provided
 *  parameters
 *
 * @param {Boolean} lower
 * @param {Boolean} upper
 * @param {Boolean} number
 * @param {Boolean} symbol
 * @param {Number} length
 * @returns {String}
 */
function generatePassword(
  lower: boolean,
  upper: boolean,
  number: boolean,
  symbol: boolean,
  length: number
): string {
  let generatedPassword: string = '';
  const typesCount: number = lower + upper + number + symbol;

  const typesArr: Array<Checks> = [
    { lower },
    { upper },
    { number },
    { symbol }
  ].filter(item => Object.values(item)[0]);

  // If all provided booleans are false return empty stirng password
  if (typesCount === 0) {
    return '';
  }

  // Generate the password
  for (let i = 0; i < length; i += 1)
    generatedPassword += generateRandomChar(typesArr, typesCount);

  const finalPassword: string = generatedPassword.slice(0, length);

  return finalPassword;
}
export default generatePassword;
