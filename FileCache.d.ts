export = FileCache;
declare class FileCache {
    /**
     * This is a file cache plug-in based on nodejs
     * @param saveFilePath? {string}
     * @example
     * //use default savePath process.cwd()+".runtime/cache.json"
     * const fileCache = new FileCache()
     * //use my savePath
     * const fileCache = new FileCache(".runtime/mycache.json")
     * @constructor
     */
    constructor(saveFilePath: any);
    data: any;
    dirPath: string;
    lastClearTime: number;
    /**
     * Has Determine if an item exists in the cache.
     * @param key
     * @return {boolean}
     * @example
     *      cache.Has("tank")
     * @Function
     */
    Has(key: any): boolean;
    /**
     * Get Retrieve an item from the cache by key.
     * @param key
     * @param defaultVal?
     * @return {string|null}
     * @example
     *   cache.Get("tank")
     *   cache.Get("tank","defaultVal")
     * @Function
     */
    Get(key: any, defaultVal?: any): string | null;
    /**
     * Forever Store an item in the cache indefinitely.
     * @param key
     * @param val
     * @example
     *      cache.Forever("tank","nice")
     * @Function
     */
    Forever(key: any, val: any): void;
    /**
     * Forget Remove an item from the cache.
     * @param key
     * @return {null|*}
     * @example
     *     cache.Forget("tank","nice")
     * @Function
     */
    Forget(key: any): null | any;
    /**
     * @param keys {string|string[]}
     * @function
     */
    ForgetByKeys(keys: string | string[]): void;
    /**
     *  Remove  the cache according to the prefix
     * @param prefix
     * @function
     */
    FlushByPrefix(prefix?: string): void;
    /**
     * Increase the validity period
     * @param ttl {Number} seconds
     */
    incrementTll(key: any, ttl?: number): void;
    /**
     * Pull Retrieve an item from the cache and delete it.
     * @param key
     * @example
     *     cache.Pull("tank")
     * @Function
     */
    Pull(key: any): string;
    /**
     * Get the remaining time to live
     * @param key
     * @return {number}  Second
     * @function
     */
    Ttl(key: any): number;
    /**
     * Get all keys or filter by prefix
     * @param prefix? {string}
     * @return string[]
     * @function
     */
    GetKeys(prefix?: string): string[];
    /**
     * When saving occurs, interval 3 minutes clear expire cache
     * @private
     */
    private _clearExpire;
    _Now(): number;
    /**
     * Set Store an item in the cache for a given number of seconds.
     * @param key
     * @param val
     * @param ttl Second
     * @return {*}
     * @example
     *    cache.Store("tank", "man", 1)
     * @Function
     */
    Store(key: any, val?: any, ttl?: number): any;
    /**
     * Set Store an item in the cache for a given number of seconds. as same Store function
     * @param key
     * @param val
     * @param ttl Second
     * @return {*}
     * @example
     *    cache.Set("tank", "man", 1)
     * @Function
     */
    Set(key: any, val?: any, ttl?: number): any;
    /**
     * The Add method will only store data that does not exist in the cache. If the storage is successful, it will return true, otherwise it will return false:
     * @param key
     * @param val
     * @param ttl
     * @return {boolean}
     * @example
     *    cache.Add("tank", "man", 1)
     * @Function
     */
    Add(key: any, val?: any, ttl?: number): boolean;
    /**
     * Flush Remove all items from the cache.
     * @example
     *    cache.Flush()
     * @Function
     */
    Flush(): void;
    /**
     *
     * @private
     */
    private _Nuke;
    /**
     * @private
     */
    private _Save;
}
