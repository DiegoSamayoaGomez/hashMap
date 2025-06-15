import { LinkedList } from "./linkedList.js";

const HashMap = () => {
  let instanceOfLinkedList = LinkedList();

  // let myBucket = [];
  // Create an array of 16 buckets
  let myBucket = new Array(16);
  let numberOfBuckets = myBucket.length;
  // Set a load factor to know when will be needed to increase the number of buckets
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
    //myBucket[bucketLocation] = { [key]: value };

    if (!myBucket[bucketLocation]) {
      myBucket[bucketLocation] = LinkedList(); // create a new linked list
    }
    myBucket[bucketLocation].append({ [key]: value }); // just append, don’t assign

    // Store the kay value pair in that bucket
    // ** Check if the value to store is the same, if so, replace it, otherwise add it as a linked list to that bucket**
    //myBucket.splice(bucketLocation, 1, { [key]: value });
  };

  // Get the array of values stored in the bucket
  const getBucket = () => myBucket;
  const getNumberOfBuckets = () => {
    return myBucket.length;
  };

  const printBuckets = () => {
    myBucket.forEach((bucket, index) => {
      if (bucket) {
        console.log(`Bucket ${index}: ${bucket.toString()}`);
      } else {
        console.log(`Bucket ${index}: empty`);
      }
    });
  };

  return {
    hash, // Delete later access to this function
    getNumberOfBuckets, // Delete later this function entirely
    set,
    getBucket,
    printBuckets,
  };
};

let instanceOfHashMap = HashMap();
// Know the index of the key value pair
console.log(instanceOfHashMap.hash("Diego"));

instanceOfHashMap.set("Diego", "Old value"); // Delete later the access to this function
instanceOfHashMap.set("Alejandro", "Different value"); // Delete later the access to this function
instanceOfHashMap.set("Diego", "New value"); // Delete later the access to this function

console.log("Print bucket", instanceOfHashMap.getBucket());
console.log("Number of buckets", instanceOfHashMap.getNumberOfBuckets());
instanceOfHashMap.printBuckets();
