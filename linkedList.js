export const LinkedList = function () {
  let head = null;
  let size = 0;

  // Adds a new node containing value to the end of the list
  let append = (value) => {
    // If the head is empty, add it at the beginning
    if (head === null) {
      preppend(value);
    } else {
      // Otherwise, traverse the whole list at the end and add the new node
      let current = head;
      while (current.next) {
        current = current.next;
      }
      current.next = node(value);
      size++;
    }
  };
  // Adds a new node containing value to the start of the list
  let preppend = (value) => {
    head = node(value, head);
    size++;
  };

  // Returns the total number of nodes in the list
  let getSize = () => size;

  // Returns the first node in the list
  let getHead = () => head.value;

  // Returns the last node in the list
  let getTail = () => {
    let current = head;
    while (current.next) {
      current = current.next;
      if (current.next === null) {
        return current.value;
      }
    }
  };

  // Returns the node at the given index
  let atIndex = (index) => {
    let current = head;
    let count = 0;

    while (current) {
      if (count === index) {
        return current;
      }
      count++;
      current = current.next;
    }
    return null;
  };

  // Removes the last element from the list
  let pop = (nodeToDelete) => {
    if (!head) return "There is no head";

    let current = head;
    let previous = null;

    while (current) {
      // compare the key of the current value (node) with the node
      // received (node to delete), if they are the same delete it
      if (current.value.key === nodeToDelete.value.key) {
        if (!previous) {
          // Deleting head
          head = current.next;
        } else {
          // Deleting non-head node
          previous.next = current.next;
        }
        size--;
        return true;
      }
      previous = current;
      current = current.next;
    }

    return false;
  };

  // Returns true if the passed in value exists in the list, otherwise returns false
  let contains = (valueToCompare) => {
    let current = head;

    while (current) {
      // Check if the current value (node) is the same with the value (node) received
      if (current.value === valueToCompare) {
        return true;
      }
      current = current.next;
      if (current === null) {
        return false;
      }
    }
  };

  // Returns the index of the node containing value, or null if not found.
  let find = (keyToFind) => {
    //console.log(key);
    let current = head;
    let count = 0;
    while (current) {
      // Check if the key of the current value (node) is the same as the key to find
      // REMEMBER that a node contains (value, next)
      // inside value an object is received which contains key value pairs
      // Dont confuse value of the node and the key value pair inside of value (node)
      if (current.value.key === keyToFind) {
        return count;
      }
      count++;
      current = current.next;
    }
    return null;
  };

  // Represents your LinkedList objects as strings, so you can print them out and preview them in the console
  let toString = () => {
    let current = head;
    let textOfValue = "";
    while (current !== null) {
      current.value;
      //textOfValue += ` (${JSON.stringify(current.value)})`;
      textOfValue += `[${current.value.key}: ${current.value.value}] `;
      current = current.next;
    }
    return textOfValue;
  };

  // Return the key of each node
  // NODE (value) {key <--This is what you get: value}
  let getKeys = () => {
    let current = head;
    let currentKey = [];
    while (current !== null) {
      currentKey.push(current.value.key);
      current = current.next;
    }

    return currentKey;
  };

  // Return the value of each node
  // NODE (value) {key : value <--This is what you get}
  let getValues = () => {
    let current = head;
    let currentValue;
    while (current !== null) {
      currentValue = current.value.value;
      current = current.next;
    }

    return currentValue;
  };
  // Return the key value pair of each node AS PLAIN TEXT
  let getKeyValues = () => {
    let current = head;
    let currentKeyValue = [];

    while (current !== null) {
      let key;
      let value;
      key = current.value.key;
      value = current.value.value;
      currentKeyValue.push({ key, value });

      current = current.next;
    }

    return currentKeyValue;
  };
  return {
    append,
    preppend,
    getSize,
    getHead,
    getTail,
    atIndex,
    pop,
    contains,
    find,
    toString,
    getKeys,
    getValues,
    getKeyValues,
  };
};

const node = function (value, next = null) {
  return { value, next };
};
