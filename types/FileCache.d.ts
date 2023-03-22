export = FileCache;
declare class FileCache {
    /**
     * This is a file cache plug-in based on nodejs
     * @param {string} [saveFilePath=""]
     * @example
     * //use default savePath process.cwd()+".runtime/cache.json"
     * const fileCache = new FileCache()
     * //use my savePath
     * const fileCache = new FileCache(".runtime/mycache.json")
     * @constructor
     */
    constructor(saveFilePath?: string);
    data: any;
    dirPath: string;
    lastClearTime: number;
    /**
     * has Determine if an item exists in the cache.
     * @param key
     * @return {boolean}
     * @example
     *      cache.has("tank")
     * @Function
     */
    Has(key: any): boolean;
    /**
     * has Determine if an item exists in the cache.
     * @param key
     * @return {boolean}
     * @example
     *      cache.has("tank")
     * @Function
     */
    has(key: any): boolean;
    /**
     * get Retrieve an item from the cache by key.
     * @param key
     * @param defaultVal?
     * @return {string|null}
     * @example
     *   cache.get("tank")
     *   cache.get("tank","defaultVal")
     * @Function
     */
    Get(key: any, defaultVal?: any): string | null;
    /**
     * get Retrieve an item from the cache by key.
     * @param key
     * @param defaultVal?
     * @return {string|null}
     * @example
     *   cache.get("tank")
     *   cache.get("tank","defaultVal")
     * @Function
     */
    get(key: any, defaultVal?: any): string | null;
    /**
     * forever store an item in the cache indefinitely.
     * @param key
     * @param val
     * @example
     *      cache.forever("tank","nice")
     * @Function
     */
    Forever(key: any, val: any): void;
    /**
     * forever store an item in the cache indefinitely.
     * @param key
     * @param val
     * @example
     *      cache.forever("tank","nice")
     * @Function
     */
    forever(key: any, val: any): void;
    /**
     * forget remove an item from the cache.
     * @param key
     * @return {null|*}
     * @example
     *     cache.forget("tank","nice")
     * @Function
     */
    Forget(key: any): null | any;
    /**
     * forget remove an item from the cache.
     * @param key
     * @return {null|*}
     * @example
     *     cache.forget("tank","nice")
     * @Function
     */
    forget(key: any): null | any;
    /**
     * @param keys {string|string[]}
     * @function
     */
    ForgetByKeys(keys: string | string[]): void;
    /**
     * @param keys {string|string[]}
     * @function
     */
    forgetByKeys(keys: string | string[]): void;
    /**
     *  remove  the cache according to the prefix
     * @param prefix
     * @function
     */
    FlushByPrefix(prefix?: string): void;
    /**
     *  remove  the cache according to the prefix
     * @param prefix
     * @function
     */
    flushByPrefix(prefix?: string): void;
    /**
     * Increase the validity period
     * @param ttl {Number} seconds
     */
    incrementTll(key: any, ttl?: number): void;
    /**
     * pull Retrieve an item from the cache and delete it.
     * @param key
     * @example
     *     cache.pull("tank")
     * @Function
     */
    Pull(key: any): string;
    /**
     * pull Retrieve an item from the cache and delete it.
     * @param key
     * @example
     *     cache.pull("tank")
     * @Function
     */
    pull(key: any): string;
    /**
     * get the remaining time to live
     * @param key
     * @return {number}  millisecond
     * @function
     */
    Ttl(key: any): number;
    /**
     * get the remaining time to live
     * @param key
     * @return {number}  millisecond
     * @function
     */
    ttl(key: any): number;
    /**
     * get all keys or filter by prefix
     * @param prefix? {string}
     * @return string[]
     * @function
     */
    GetKeys(prefix?: string): string[];
    /**
     * get all keys or filter by prefix
     * @param prefix? {string}
     * @return string[]
     * @function
     */
    getKeys(prefix?: string): string[];
    /**
     * When saving occurs, interval 3 minutes clear expire cache
     * @private
     */
    private _clearExpire;
    _now(): number;
    /**
     * set store an item in the cache for a given number of seconds.
     * @param key
     * @param val
     * @param ttl Second
     * @return {*}
     * @example
     *    cache.store("tank", "man", 1)
     * @Function
     */
    Store(key: any, val?: any, ttl?: number): any;
    /**
     * set store an item in the cache for a given number of seconds.
     * @param key
     * @param val
     * @param ttl Second
     * @example
     *    cache.store("tank", "man", 1)
     * @Function
     */
    store(key: any, val?: any, ttl?: number): void;
    /**
     * set store an item in the cache for a given number of seconds. as same store function
     * @param key
     * @param val
     * @param ttl Second
     * @example
     *    cache.set("tank", "man", 1)
     * @Function
     */
    Set(key: any, val?: any, ttl?: number): void;
    /**
     * set store an item in the cache for a given number of seconds. as same store function
     * @param key
     * @param val
     * @param ttl Second
     * @return {*}
     * @example
     *    cache.set("tank", "man", 1)
     * @Function
     */
    set(key: any, val?: any, ttl?: number): any;
    /**
     * The add method will only store data that does not exist in the cache. If the storage is successful, it will return true, otherwise it will return false:
     * @param key
     * @param val
     * @param ttl
     * @return {boolean}
     * @example
     *    cache.add("tank", "man", 1)
     * @Function
     */
    Add(key: any, val?: any, ttl?: number): boolean;
    /**
     * The add method will only store data that does not exist in the cache. If the storage is successful, it will return true, otherwise it will return false:
     * @param key
     * @param val
     * @param ttl
     * @return {boolean}
     * @example
     *    cache.add("tank", "man", 1)
     * @Function
     */
    add(key: any, val?: any, ttl?: number): boolean;
    /**
     * flush remove all items from the cache.
     * @example
     *    cache.flush()
     * @Function
     */
    Flush(): void;
    /**
     * flush remove all items from the cache.
     * @example
     *    cache.flush()
     * @Function
     */
    flush(): void;
    /**
     *
     * @private
     */
    private _nuke;
    /**
     * @private
     */
    private _save;
}
