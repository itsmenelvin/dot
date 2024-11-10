// src/utils/emailUtils.js

export const validatePrefix = (str) => {
    const regex = /^[a-zA-Z0-9.]{6,30}$/; // Letters, numbers, periods, 6-30 chars
    return regex.test(str);
  };
  
  export const calculateEmailCount = (input) => {
    const length = input.length;
    if (length < 6 || length > 30) return 0; // Enforce Gmail length constraints
    return Math.pow(2, length - 1);
  };
  
  export const generateEmail = (prefix, variationIndex, provider) => {
    let email = prefix[0];
    const length = prefix.length;
  
    for (let i = 1; i < length; i++) {
      // Bitwise operation to determine if a dot should be inserted
      if ((variationIndex & (1 << (i - 1))) !== 0) {
        email += '.';
      }
      email += prefix[i];
    }
  
    return `${email}@${provider}`;
  };
  ``