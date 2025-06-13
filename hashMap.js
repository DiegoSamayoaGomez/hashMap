const HashMap = () => {
  let myBucket = [0];
  let numberOfBuckets = myBucket.length;
  let loadFactor = 0.75;
  let capacity = numberOfBuckets;

  // Takes a key and produces a hash code with it.
  // ** EDGE CASE ** For long keys, the hash code will exceed the integer value of JS
  // and produce inaccurate data. Use % to prevent it
  const hash = (key) => {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % 16;
  };

  /*
   takes two arguments: the first is a key, and the second is a 
   value that is assigned to this key. 
   If a key already exists, then the old value is overwritten
  */
  const set = (key, value) => {
    // Pass the key to the hash function
    let bucketLocation = hash(key);
    // Find the bucket at index
    // Store the kay value pair in that bucket
    myBucket.splice(bucketLocation, 0, { [key]: value });
    console.log("Created, I guess");
    console.log(myBucket);
  };

  // Get the array of values stored in the bucket
  const getBucket = () => myBucket;
  const getNumberOfBuckets = () => {
    myBucket.length;
  };

  return {
    hash, // Delete later access to this function
    getNumberOfBuckets, // Delete later this function entirely
    set,
    getBucket,
  };
};

let instanceOfHashMap = HashMap();
// Know the index of the key value pair
console.log(instanceOfHashMap.hash("Diego"));
instanceOfHashMap.set("Diego", "Samayoa"); // Delete later the access to this function
console.log("Print bucket", instanceOfHashMap.getBucket());
console.log(instanceOfHashMap.getNumberOfBuckets());
