const HashMap = () => {
  let loadFactor;
  let capacity;

  // Takes a key and produces a hash code with it.
  // ** EDGE CASE ** For long keys, the hash code will exceed the integer value of JS
  // and produce inaccurate data. Use % to prevent it
  const hash = (key) => {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  };

  /*
   takes two arguments: the first is a key, and the second is a 
   value that is assigned to this key. 
   If a key already exists, then the old value is overwritten
  */
  const set = (key, value) => {};

  return { hash };
};
