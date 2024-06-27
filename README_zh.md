[English](./README.md) | 中文

# tank-cache
![npm](https://img.shields.io/npm/dw/tank-cache)

这是一个基于nodejs的缓存插件

## 安装

```shell
npm install --save tank-cache
```

## 例子

```js
//导入 tank-cache
const FileCache = require("tank-cache/index")

// 默认缓存保存 process.cwd()+".runtime/cache.json"
const cache = new FileCache()
// 自定义缓存路径
const cache = new FileCache(".runtime/mycache.json")
// 存储 
cache.store("tank", "man", 1)
// or 
cache.set("tank", "man", 1)


```

## apis

### constructor(saveFilePath: any);

构造函数

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

检测是否存在该项

```
@param key
@return {boolean}
@example
     cache.has("tank")
@Function
```

### get(key: any, defaultVal?: any): string | null;

根据key从缓存中获取

```
* @param key
* @param defaultVal?
* @return {string|null}
* @Function
```

### forever(key: any, val: any): void;

存储一个永久项

```
@param key
@param val
@example
     cache.forever("tank","nice")
@Function
```

### forget(key: any): null | any;

移除指定key的缓存

```
@param key
@return {null|*}
@example
    cache.forget("tank","nice")
@Function
```

### pull(key: any): string;

获取缓存值后删除

```
@param key
@example
    cache.pull("tank")
@Function
```

### store(key: any, val?: any, ttl?: number): any;

存储指定key的值到缓存，并可设置超时时间，ttl为0时，不会失效

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

与 store 功能相同

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

新增一个不存在的缓存，如果key值存在则不存储返回false，存储成功返回true

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

清空所有缓存

```
@example
   cache.flush()
@Function
```

### forgetByKeys(keys: string | string[]): void;

根据1个或多个key删除缓存

```
@param keys {string|string[]}
@function
```

### flushByPrefix(prefix?: string): void;

移除所有key包含前缀的缓存

```
@param prefix {string}
@function
```

### incrementTll(key: any, ttl?: number): void;

增加生命时长，单位秒

```
@param ttl {Number} seconds
@Function
```

### ttl(key: any): number;

获取剩余存活时间 单位毫秒

```
@param key
@return {number}  millisecond
@function
@Function
```

### getKeys(prefix?: string): string[];

获取所有key或包含指定前缀的key集合

```
@param prefix? {string}
@return string[]
@Function
```
