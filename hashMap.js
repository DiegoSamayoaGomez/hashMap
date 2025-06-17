import { LinkedList } from "./linkedList.js";

const HashMap = () => {
  let instanceOfLinkedList = LinkedList();

  // Set initial value of buckets, it will grow based on some factors
  let setNumberOfBuckets = 16;
  // Create an array of 16 buckets
  let myBucket = new Array(setNumberOfBuckets);
  let numberOfBuckets = myBucket.length;
  // Set a load factor to know when will be needed to increase the number of buckets
  let loadFactor = 0.75;
  let capacity = numberOfBuckets;
  // Store a number of keys created
  let keyLenght = 0;
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
    if (!myBucket[bucketLocation]) {
      myBucket[bucketLocation] = LinkedList(); // create a new linked list
    }
    // ** Check if the value to store is the same, if so, replace it, otherwise add it as a linked list to that bucket**
    let current = myBucket[bucketLocation].atIndex(0);
    while (current) {
      if (current.value.key === key) {
        current.value.value = value; // Replace old value
        return;
      }
      current = current.next;
    }
    //myBucket[bucketLocation] = { [key]: value };
    myBucket[bucketLocation].append({ key, value }); // just append, don’t assign
    keyLenght++;
    // Store the kay value pair in that bucket
  };

  // Get the array of values stored in the bucket
  const getBucket = () => myBucket;
  const getNumberOfBuckets = () => {
    return myBucket.length;
  };

  // Takes one argument as a key and returns the value that is assigned to this key
  const get = (key) => {
    // Hash the key and calculate the index of the bucket
    let indexOfBucket = hash(key);
    // If the bucket is not empty, go to that bucket
    if (myBucket[indexOfBucket] === undefined) {
      return "Empty bucket";
    } else {
      // Compare if the node’s key is the same key that was used for the retrieval
      let selectedBucket = myBucket[indexOfBucket];
      // Get the index of the node that contains the key value pair (if exists), otherwise end the execution
      let findKeyOfNode = selectedBucket.find(key);
      if (findKeyOfNode !== null) {
        // Based on the index of the node, return the value which corresponds to the key
        let getValueOfNode = selectedBucket.atIndex(findKeyOfNode);
        return JSON.stringify(getValueOfNode.value.value);
      }
      return "Key not found";
    }
  };

  // takes a key as an argument and returns true or false based on
  // whether or not the key is in the hash map.
  const has = (key) => {
    // Hash the key and calculate the index of the bucket
    let indexOfBucket = hash(key);
    // IF the bucket is not empty, go to that bucket
    if (myBucket[indexOfBucket] === undefined) {
      return false;
    } else {
      // Check if the key exists in the bucket
      let selectedBucket = myBucket[indexOfBucket];
      // If find() returns an index, it means a key value pair exists
      let findKeyOfNode = selectedBucket.find(key);
      return findKeyOfNode !== null ? true : false;
    }
  };
  // takes a key as an argument. If the given key is in the hash map,
  // it should remove the entry with that key and return true.
  const remove = (key) => {
    // Hash the key and calculate the index of the bucket
    let indexOfBucket = hash(key);
    // IF the bucket is not empty, go to that bucket
    if (myBucket[indexOfBucket] === undefined) {
      return false;
    } else {
      // Compare if the node’s key is the same key that was used for the retrieval
      let selectedBucket = myBucket[indexOfBucket];
      // Get the index of the node that contains the key value pair (if exists), otherwise end the execution
      let findKeyOfNode = selectedBucket.find(key);
      if (findKeyOfNode !== null) {
        // Based on the index of the node, return the value which corresponds to the key
        let getValueOfNode = selectedBucket.atIndex(findKeyOfNode);
        let responseOfPop = selectedBucket.pop(getValueOfNode);
        responseOfPop === true ? keyLenght-- : keyLenght;
        return responseOfPop;
      }

      return "Key not found";
    }
  };

  // Returns the number of stored keys in the hash map
  const length = () => {
    return keyLenght;
  };

  //  Removes all entries in the hash map
  const clear = () => {
    // Empty the array of buckets
    myBucket.length = 0;

    // Create a new array
    myBucket = new Array(setNumberOfBuckets);
  };

  // Returns an array containing all the keys inside the hash map
  const keys = () => {
    // Create an empty array to store the keys
    let allKeys = [];
    myBucket.forEach((bucket) => {
      allKeys.push(bucket.getKeys());
    });
    // Return the collected keys
    return allKeys;
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
    get,
    has,
    remove,
    length,
    clear,
    keys,
  };
};

let instanceOfHashMap = HashMap();
// Know the index of the key value pair
console.log(instanceOfHashMap.hash("sara"));

instanceOfHashMap.set("Diego", "Old value"); // Delete later the access to this function
instanceOfHashMap.set("Alejandro", "Different value"); // Delete later the access to this function
instanceOfHashMap.set("Diego", "New value"); // Delete later the access to this function
instanceOfHashMap.set("Sara", "xd?");
instanceOfHashMap.set("Rasa", "xd?");
instanceOfHashMap.set("Rasa", "Nuevo");

console.log("Print bucket", instanceOfHashMap.getBucket());
console.log("Number of buckets", instanceOfHashMap.getNumberOfBuckets());
instanceOfHashMap.printBuckets();
console.log("GET", instanceOfHashMap.get("Rasa"));
console.log("HAS", instanceOfHashMap.has("Diego"));
console.log("LENGTH", instanceOfHashMap.length());
console.log("REMOVE", instanceOfHashMap.remove("Rasa"));
instanceOfHashMap.printBuckets();
console.log("LENGTH", instanceOfHashMap.length());
instanceOfHashMap.set("Test", "Nuevo");
instanceOfHashMap.printBuckets();
console.log("LENGTH", instanceOfHashMap.length());
instanceOfHashMap.printBuckets();

console.log(instanceOfHashMap.keys());

/* 
instanceOfHashMap.clear();
console.log("Print bucket after clear", instanceOfHashMap.getBucket());
console.log(
  "Number of buckets after clear",
  instanceOfHashMap.getNumberOfBuckets()
);
instanceOfHashMap.printBuckets();
*/
