English | [中文](./README_zh.md)

# tank-cache

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
cache.Store("tank", "man", 1)
// or 
cache.Set("tank", "man", 1)


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

### Has(key: any): any;

Has Determine if an item exists in the cache.

```
@param key
@return {boolean}
@example
     cache.Has("tank")
@Function
```

### Get(key: any, defaultVal?: any): string | null;

Get Retrieve an item from the cache by key.

```
* @param key
* @param defaultVal?
* @return {string|null}
* @Function
```

### Forever(key: any, val: any): void;

Forever Store an item in the cache indefinitely.

```
@param key
@param val
@example
     cache.Forever("tank","nice")
@Function
```

### Forget(key: any): null | any;

Forget Remove an item from the cache.

```
@param key
@return {null|*}
@example
    cache.Forget("tank","nice")
@Function
```

### Pull(key: any): string;

Pull Retrieve an item from the cache and delete it.

```
@param key
@example
    cache.Pull("tank")
@Function
```

### Store(key: any, val?: any, ttl?: number): any;

Set Store an item in the cache for a given number of seconds.

```
@param key
@param val
@param ttl Second
@return {*}
@example
   cache.Store("tank", "man", 1)
@Function
```

### Set(key: any, val?: any, ttl?: number): any;

Set Store an item in the cache for a given number of seconds. as same Store function

```
@param key
@param val
@param ttl Second
@return {*}
@example
   cache.Set("tank", "man", 1)
@Function
```

### Add(key: any, val?: any, ttl?: number): boolean;

The Add method will only store data that does not exist in the cache. If the storage is successful, it will return true,
otherwise it will return false:

```
@param key
@param val
@param ttl
@return {boolean}
@example
   cache.Add("tank", "man", 1)
@Function
```

### Flush(): void;

Flush Remove all items from the cache.

```
@example
   cache.Flush()
@Function
```

### ForgetByKeys(keys: string | string[]): void;

```
@param keys {string|string[]}
@function
```

### FlushByPrefix(prefix?: string): void;

Remove the cache according to the prefix

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

### Ttl(key: any): number;

Get the remaining time to live

```
@param key
@return {number}  millisecond
@function
@Function
```

### GetKeys(prefix?: string): string[];

Get all keys or filter by prefix

```
@param prefix? {string}
@return string[]
@Function
```
