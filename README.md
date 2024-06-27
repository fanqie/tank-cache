English | [中文](./README_zh.md)

# tank-cache
![npm](https://img.shields.io/npm/dw/tank-cache)

This is a file cache plug-in based on nodejs

## install

```shell
npm install --save tank-cache
```

## examples

```js
//import tank-cache
const FileCache = require("tank-cache/index")

//default savePath process.cwd()+".runtime/cache.json"
const cache = new FileCache()
//use savePath
const cache = new FileCache(".runtime/mycache.json")
//store 
cache.store("tank", "man", 1)
// or 
cache.set("tank", "man", 1)


```

## apis

### constructor(saveFilePath: any);

```
* @param saveFilePath? default: ".runtime/cache.json"
* @example
* //use default savePath ".runtime/cache.json"
* const cache = new FileCache()
* //use my savePath
* const cache = new FileCache(".runtime/mycache.json")
* output path=process.cwd()+savePath
* @constructor
```

### has(key: any): any;

has Determine if an item exists in the cache.

```
@param key
@return {boolean}
@example
     cache.has("tank")
@Function
```

### get(key: any, defaultVal?: any): string | null;

get Retrieve an item from the cache by key.

```
* @param key
* @param defaultVal?
* @return {string|null}
* @Function
```

### forever(key: any, val: any): void;

forever store an item in the cache indefinitely.

```
@param key
@param val
@example
     cache.forever("tank","nice")
@Function
```

### forget(key: any): null | any;

forget remove an item from the cache.

```
@param key
@return {null|*}
@example
    cache.forget("tank","nice")
@Function
```

### pull(key: any): string;

pull Retrieve an item from the cache and delete it.

```
@param key
@example
    cache.pull("tank")
@Function
```

### store(key: any, val?: any, ttl?: number): any;

set store an item in the cache for a given number of seconds.

```
@param key
@param val
@param ttl Second
@return {*}
@example
   cache.store("tank", "man", 1)
@Function
```

### set(key: any, val?: any, ttl?: number): any;

set store an item in the cache for a given number of seconds. as same store function

```
@param key
@param val
@param ttl Second
@return {*}
@example
   cache.set("tank", "man", 1)
@Function
```

### add(key: any, val?: any, ttl?: number): boolean;

The add method will only store data that does not exist in the cache. If the storage is successful, it will return true,
otherwise it will return false:

```
@param key
@param val
@param ttl
@return {boolean}
@example
   cache.add("tank", "man", 1)
@Function
```

### flush(): void;

flush remove all items from the cache.

```
@example
   cache.flush()
@Function
```

### forgetByKeys(keys: string | string[]): void;

```
@param keys {string|string[]}
@function
```

### flushByPrefix(prefix?: string): void;

remove the cache according to the prefix

```
@param prefix {string}
@function
```

### incrementTll(key: any, ttl?: number): void;

Increase the validity period

```
@param ttl {Number} Second
@Function
```

### ttl(key: any): number;

get the remaining time to live

```
@param key
@return {number}  millisecond
@function
@Function
```

### getKeys(prefix?: string): string[];

get all keys or filter by prefix

```
@param prefix? {string}
@return string[]
@Function
```
