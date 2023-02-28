[English](./README.md) | 中文

# tank-cache

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
cache.Store("tank", "man", 1)
// or 
cache.Set("tank", "man", 1)


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

### Has(key: any): any;
检测是否存在该项
```
@param key
@return {boolean}
@example
     cache.Has("tank")
@Function
```

### Get(key: any, defaultVal?: any): string | null;

根据key从缓存中获取

```
* @param key
* @param defaultVal?
* @return {string|null}
* @Function
```

### Forever(key: any, val: any): void;

存储一个永久项

```
@param key
@param val
@example
     cache.Forever("tank","nice")
@Function
```

### Forget(key: any): null | any;

移除指定key的缓存

```
@param key
@return {null|*}
@example
    cache.Forget("tank","nice")
@Function
```

### Pull(key: any): string;

获取缓存值后删除

```
@param key
@example
    cache.Pull("tank")
@Function
```

### Store(key: any, val?: any, ttl?: number): any;

存储指定key的值到缓存，并可设置超时时间，ttl为0时，不会失效

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

与 Store 功能相同

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

新增一个不存在的缓存，如果key值存在则不存储返回false，存储成功返回true

```
@param key
@param val
@param ttl
@return {boolean}
@example
   cache.Add("tank", "man", 1)
@Function
```

Flush(): void;
清空所有缓存
```
@example
   cache.Flush()
@Function
```
