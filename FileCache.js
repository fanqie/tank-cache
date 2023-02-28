const path = require("path");
const fs = require("fs");
const DS = require("ds").DS;
module.exports = class FileCache {
    data = new DS();
    dirPath = ""

    /**
     * This is a file cache plug-in based on nodejs
     * @param saveFilePath?
     * @example
     * //use default savePath process.cwd()+".runtime/cache.json"
     * const fileCache = new FileCache()
     * //use my savePath
     * const fileCache = new FileCache(".runtime/mycache.json")
     * @constructor
     */
    constructor(saveFilePath) {
        saveFilePath = saveFilePath || ".runtime/cache.json"
        if (!path.isAbsolute(saveFilePath)) {
            this.dirPath = path.join(process.cwd(), saveFilePath)
        } else {
            this.dirPath = saveFilePath
        }
        if (!fs.existsSync(this.dirPath)) {
            fs.mkdirSync(path.dirname(this.dirPath))
            // throw new Error("not found cache.saveFile：" + this.dirPath)
        }


    }

    /**
     * Has Determine if an item exists in the cache.
     * @param key
     * @return {boolean}
     * @example
     *      cache.Has("tank")
     * @Function
     */
    Has(key) {
        return this.Get(key) !== null
    }

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
    Get(key, defaultVal = null) {
        let val = null
        let obj = this.data[key]
        if (obj) {
            if (obj.expires === 0 || this._Now() < obj.expires) {
                val = obj.val;
            } else {
                val = null;
                this._Nuke(key);
            }
        }
        return val || defaultVal;
    }

    /**
     * Forever Store an item in the cache indefinitely.
     * @param key
     * @param val
     * @example
     *      cache.Forever("tank","nice")
     * @Function
     */
    Forever(key, val) {
        this.Store(key, val, 0)
    }

    /**
     * Forget Remove an item from the cache.
     * @param key
     * @return {null|*}
     * @example
     *     cache.Forget("tank","nice")
     * @Function
     */
    Forget(key) {
        if (this.Has(key)) {
            this._Nuke(key)
        }
        return null;
    }

    /**
     * Pull Retrieve an item from the cache and delete it.
     * @param key
     * @example
     *     cache.Pull("tank")
     * @Function
     */
    Pull(key) {
        if (this.Has(key)) {
            const oldValue = this.Get(key)
            this._Nuke(key)
            return oldValue
        }
        return null;
    }

    _Now() {
        return (new Date()).getTime()
    }

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
    Store(key, val = null, ttl = 0) {
        let expires = ttl === 0 ? 0 : (this._Now() + ttl * 1000);
        if (val !== null) {
            this.data[key] = {
                expires,
                val,
            }
            this._Save()
        }
    }

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
    Set(key, val = null, ttl = 0) {
        this.Store(key, val, ttl)
    }

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
    Add(key, val = null, ttl = 0) {
        //if existed
        if (!this.Has(key)) {
            this.Store(key, val, ttl)
            return true
        }
        return false
    }

    /**
     * Flush Remove all items from the cache.
     * @example
     *    cache.Flush()
     * @Function
     */
    Flush() {
        this.data = {}
        this._Save()
    }

    /**
     *
     * @private
     */
    _Nuke(key) {
        delete this.data[key]
        this._Save()
    }

    /**
     * @private
     */
    _Save() {
        this.data.save(this.dirPath);
    }
}
