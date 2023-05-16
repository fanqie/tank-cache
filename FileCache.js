const path = require("path");
const fs = require("fs");
const DS = require("ds").DS;
module.exports = class FileCache {
    data = new DS();
    dirPath = ""
    lastClearTime = this._now()

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
    constructor(saveFilePath="") {
        saveFilePath = saveFilePath || ".runtime/cache.json"
        if (!path.isAbsolute(saveFilePath)) {
            this.dirPath = path.join(process.cwd(), saveFilePath)
        } else {
            this.dirPath = saveFilePath
        }
        if (!fs.existsSync(path.dirname(this.dirPath))) {
            fs.mkdirSync(path.dirname(this.dirPath))
            // throw new error("not found cache.saveFile：" + this.dirPath)
        }


    }

    /**
     * has Determine if an item exists in the cache.
     * @param key
     * @return {boolean}
     * @example
     *      cache.has("tank")
     * @Function
     */
    Has(key) {
        return this.has(key)
    }

    /**
     * has Determine if an item exists in the cache.
     * @param key
     * @return {boolean}
     * @example
     *      cache.has("tank")
     * @Function
     */
    has(key) {
        return this.Get(key) !== null
    }

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
    Get(key, defaultVal = null) {
        return this.get(key, defaultVal)
    }

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
    get(key, defaultVal = null) {
        let val = null
        let obj = this.data[key]
        if (obj) {
            if (obj.expires === 0 || this._now() < obj.expires) {
                val = obj.val;
            } else {
                val = null;
                this._nuke(key);
            }
        }
        return val || defaultVal;
    }

    /**
     * forever store an item in the cache indefinitely.
     * @param key
     * @param val
     * @example
     *      cache.forever("tank","nice")
     * @Function
     */
    Forever(key, val) {
        this.forever(key, val)
    }

    /**
     * forever store an item in the cache indefinitely.
     * @param key
     * @param val
     * @example
     *      cache.forever("tank","nice")
     * @Function
     */
    forever(key, val) {
        this.store(key, val, 0)
    }

    /**
     * forget remove an item from the cache.
     * @param key
     * @return {null|*}
     * @example
     *     cache.forget("tank","nice")
     * @Function
     */
    Forget(key) {
        return this.forget(key)
    }

    /**
     * forget remove an item from the cache.
     * @param key
     * @return {null|*}
     * @example
     *     cache.forget("tank","nice")
     * @Function
     */
    forget(key) {
        if (this.Has(key)) {
            this._nuke(key)
        }
        return null;
    }

    /**
     * @param keys {string|string[]}
     * @function
     */
    ForgetByKeys(keys) {
        this.forgetByKeys(keys)
    }

    /**
     * @param keys {string|string[]}
     * @function
     */
    forgetByKeys(keys) {
        if (typeof keys === "string") {
            this.Forget(keys)
            return
        }
        if (keys.length > 0) {
            keys.forEach(key => {
                if (this.data[key]) {
                    delete this.data[key]
                }
            })
            this._save()
        }
    }

    /**
     *  remove  the cache according to the prefix
     * @param prefix
     * @function
     */
    FlushByPrefix(prefix = "") {
        this.flushByPrefix(prefix)
    }

    /**
     *  remove  the cache according to the prefix
     * @param prefix
     * @function
     */
    flushByPrefix(prefix = "") {
        if (prefix) {
            const keys = this.getKeys(prefix)
            if (keys.length > 0) {
                keys.forEach(key => {
                    if (this.data[key]) {
                        delete this.data[key]
                    }
                })
                this._save()
            }
        }
    }

    /**
     * Increase the validity period
     * @param ttl {Number} seconds
     */
    incrementTll(key, ttl = 0) {
        if (this.Has(key)) {
            this.data[key].expires = this.data[key].expires !== 0 ? this.data[key].expires += ttl * 1000 : 0
            this._save()
        }
    }

    /**
     * pull Retrieve an item from the cache and delete it.
     * @param key
     * @example
     *     cache.pull("tank")
     * @Function
     */
    Pull(key) {
        return this.pull(key)
    }

    /**
     * pull Retrieve an item from the cache and delete it.
     * @param key
     * @example
     *     cache.pull("tank")
     * @Function
     */
    pull(key) {
        if (this.Has(key)) {
            const oldValue = this.Get(key)
            this._nuke(key)
            return oldValue
        }
        return null;
    }

    /**
     * get the remaining time to live
     * @param key
     * @return {number}  millisecond
     * @function
     */
    Ttl(key) {
        return this.ttl(key)
    }

    /**
     * get the remaining time to live
     * @param key
     * @return {number}  millisecond
     * @function
     */
    ttl(key) {
        let obj = this.data[key]
        if (obj) {
            if (obj.expires !== 0) {
                return obj.expires - this._now()
            } else {
                return obj.expires
            }
        }
    }

    /**
     * get all keys or filter by prefix
     * @param prefix? {string}
     * @return string[]
     * @function
     */
    GetKeys(prefix = "") {
        return this.getKeys(prefix)
    }

    /**
     * get all keys or filter by prefix
     * @param prefix? {string}
     * @return string[]
     * @function
     */
    getKeys(prefix = "") {
        const res = []
        for (let key in this.data) {
            if (prefix && key.indexOf(prefix) === 0) {
                if (this.data[key].expires === 0 || this._now() < this.data[key].expires) {
                    res.push(key)
                }
            }
            if (prefix.length === 0 && (this.data[key].expires === 0 || this._now() < this.data[key].expires)) {
                res.push(key)
            }
        }
        this._save()
        return res;
    }

    /**
     * When saving occurs, interval 3 minutes clear expire cache
     * @private
     */
    _clearExpire() {
        if ((this._now() - this.lastClearTime) > 3 * 60 * 1000) {
            for (let key in this.data) {
                if (this.data[key].expires !== 0 && this._now() < this.data[key].expires) {
                    delete this.data[key]
                }
            }
            this._save()
            this.lastClearTime = this._now()
        }
    }

    _now() {
        return (new Date()).getTime()
    }

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
    Store(key, val = null, ttl = 0) {
        let expires = ttl === 0 ? 0 : (this._now() + ttl * 1000);
        if (val !== null) {
            this.data[key] = {
                expires,
                val,
            }
            this._save()
        }
    }

    /**
     * set store an item in the cache for a given number of seconds.
     * @param key
     * @param val
     * @param ttl Second
     * @example
     *    cache.store("tank", "man", 1)
     * @Function
     */
    store(key, val = null, ttl = 0) {
        let expires = ttl === 0 ? 0 : (this._now() + ttl * 1000);
        if (val !== null) {
            this.data[key] = {
                expires,
                val,
            }
            this._save()
        }
    }

    /**
     * set store an item in the cache for a given number of seconds. as same store function
     * @param key
     * @param val
     * @param ttl Second
     * @example
     *    cache.set("tank", "man", 1)
     * @Function
     */
    Set(key, val = null, ttl = 0) {
        this.set(key, val, ttl)
    }

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
    set(key, val = null, ttl = 0) {
        this.store(key, val, ttl)
    }

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
    Add(key, val = null, ttl = 0) {
        return this.add(key, val, ttl)
    }

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
    add(key, val = null, ttl = 0) {
        //if existed
        if (!this.Has(key)) {
            this.store(key, val, ttl)
            return true
        }
        return false
    }

    /**
     * flush remove all items from the cache.
     * @example
     *    cache.flush()
     * @Function
     */
    Flush() {
        this.flush()

    }

    /**
     * flush remove all items from the cache.
     * @example
     *    cache.flush()
     * @Function
     */
    flush() {
        this.data = {}
        this._save()

    }

    /**
     *
     * @private
     */
    _nuke(key) {
        delete this.data[key]
        this._save()
    }

    /**
     * @private
     */
    _save() {
        this.data.save(this.dirPath);
        this._clearExpire()
    }
}
