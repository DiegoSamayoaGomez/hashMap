# hashMap
Creating my own HashMap implementation

One of the most used data structures across programming languages is a hash table, aka hash map. 
A hash map is basically an array of linked lists

## Functions
- `hash(key)` takes a key and produces a hash code with it. 

- `set(key, value)` takes two arguments: the first is a key, and the second is a value that is assigned to this key. If a key already exists, then the old value is overwritten.
If there are colissions, it will generate a hash map in that bucket.

- `get(key)` takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null.

- `has(key)` takes a key as an argument and returns true or false based on whether or not the key is in the hash map.

- `remove(key)` takes a key as an argument. if the given key exists returns true, otherwise returns false.

- `length()` returns the number of stored keys in the hash map.

- `clear()` removes all entries in the hash map.

- `keys()` returns an array containing all the keys inside the hash map.

- `values()` returns an array containing all the values.

- `entries()` returns an array that contains each key, value pair. If you want to read the data remember to use dot notation. `Example: returnValue[0].key / returnValue[0].value `

## Growth of a hash map
There is an initial `capacity of 16 buckets`, with a `load factor of 0.75`, so if there are more than 12 entries `(16 * 075)` it will trigger the `growHashMap()` function which will cause to double the capacity of the buckets and the load levels of the expanded hash map should drop well below our load factor, and the entries should be spread evenly among the expanded buckets.


