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
  let capacity = setNumberOfBuckets;
  // Store a number of keys created
  let keyLenght = 0;

  let numberToTakeCare = setNumberOfBuckets * loadFactor;
  console.log("TAKE CARE OF", numberToTakeCare);

  let isResizing = false;

  // Takes a key and produces a hash code with it.
  // ** EDGE CASE ** For long keys, the hash code will exceed the integer value of JS
  // and produce inaccurate data. Use % to prevent it
  const hash = (key) => {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % setNumberOfBuckets;
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
    checkGrowth();
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

    // Reset the counter of keys
    keyLenght = 0;
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
    return allKeys.flat();
  };

  // Returns an array containing all the values inside the hash map
  const values = () => {
    // Create an empty array to store the values
    let allValues = [];
    myBucket.forEach((bucket) => {
      allValues.push(bucket.getValues());
    });
    return allValues.flat();
  };

  // Returns an array that contains each key, value pair
  const entries = () => {
    let allEntries = [];
    myBucket.forEach((bucket) => {
      //const { numba1, numba2 } = bucket.getKeyValues();
      //console.log("XDD ->", bucket.getKeyValues());
      allEntries.push(bucket.getKeyValues());
    });
    // Return the collected values as a 1D array
    let flattenedEntries = allEntries.flat();
    return flattenedEntries;
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

  // Create a function which will grow the hash map capacity
  const growHashMap = () => {
    isResizing = true; // prevent recursion
    // Double the number of buckets
    setNumberOfBuckets = setNumberOfBuckets * 2;
    // Copy all the values
    let storedValues = entries();
    // Clear the old array of buckets
    clear();
    // Store the old data into the new array with re hashed data
    storedValues.forEach((keyValuePair) => {
      let key = keyValuePair.key;
      let value = keyValuePair.value;
      set(key, value);
    });

    isResizing = false; // re-enable growth check
  };

  const checkGrowth = () => {
    if (isResizing) return;

    if (keyLenght > numberToTakeCare) {
      console.log("TOO BIG");
      console.log(length());
      growHashMap();
      console.log("IT HAS BEEN RESIZED TO", getBucket());
      numberToTakeCare = setNumberOfBuckets * loadFactor;
      console.log("NEW MAX NUMBER:", numberToTakeCare);
    } else {
      return;
    }
  };

  return {
    hash,
    getNumberOfBuckets,
    set,
    getBucket,
    printBuckets,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
    //    growHashMap,
    //   checkGrowth,
  };
};

let instanceOfHashMap = HashMap();
// EXAMPLES
console.log("set(key, value)-> ");
instanceOfHashMap.set("guayaba", "green");
instanceOfHashMap.set("melon", "orange");
instanceOfHashMap.set("watch", "black");
instanceOfHashMap.set("ball", "white");
console.log("get(key) ->", instanceOfHashMap.get("ball"));
console.log("has(key) ->", instanceOfHashMap.has("guayaba"));
//console.log("remove(key) ->", instanceOfHashMap.remove("ball")); it will remove THIS entry so unchecked it if you want to try it
console.log("length() ->", instanceOfHashMap.length());
//console.log("clear() ->", instanceOfHashMap.clear()); // it will remove ALL entries so unchecked it if you want to try it
console.log("keys() ->", instanceOfHashMap.keys());
console.log("values() ->", instanceOfHashMap.values());
console.log("entries() ->", instanceOfHashMap.entries());

// EXTRA FUNCTIONS
instanceOfHashMap.printBuckets();
console.log(instanceOfHashMap.getBucket());
console.log("hash() -> ", instanceOfHashMap.hash("Test"));

// CAUSE GROWTH IN THE HASH MAP

instanceOfHashMap.set("apple", "red");
instanceOfHashMap.set("banana", "yellow");
instanceOfHashMap.set("carrot", "orange");
instanceOfHashMap.set("dog", "brown");
instanceOfHashMap.set("elephant", "gray");
instanceOfHashMap.set("frog", "green");
instanceOfHashMap.set("grape", "purple");
instanceOfHashMap.set("hat", "black");
instanceOfHashMap.set("ice cream", "white");
instanceOfHashMap.set("jacket", "blue");
instanceOfHashMap.set("kite", "pink");

instanceOfHashMap.printBuckets();
console.log("entries() ->", instanceOfHashMap.entries());
