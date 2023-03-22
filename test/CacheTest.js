const describe = require('mocha').describe;
const FileCache = require("../FileCache")

const assert = require("assert");

describe('CacheTest', () => {
    let fileCache=null
    beforeEach(() => {
         fileCache = new FileCache()
    })
    it("fileCacheTest", (done) => {

        fileCache.store("noTankPullXX", "tankPullXX", 60 * 60 * 24)

        fileCache.store("xxx", "man", 1)
        fileCache.store("tank", "man", 1)
        assert.equal(fileCache.get("tank"), "man");
        fileCache.store("tankPull", "pull", 1)

        //get and remove it (key:tankPull)
        assert.equal(fileCache.pull("tankPull"), "pull")
        assert.equal(fileCache.get("tankPull"), null)
        fileCache.forever("tankForever", "forever")
        fileCache.add("tankAdd", "add", 60 * 60 * 24)

        assert.equal(fileCache.get("tankPull"), null)
        assert.equal(fileCache.getKeys().length, 5)
        assert.equal(fileCache.getKeys("tank").length, 3)

        setTimeout(() => {
            assert.equal(fileCache.ttl("tank") > 0, true);
            fileCache.incrementTll("tank", 1000)
            assert.equal(fileCache.ttl("tank") > 1000, true)
            assert.equal(fileCache.get("tank"), "man");
            assert.equal(fileCache.get("tankForever"), "forever");
            fileCache.forget("tankForever")

        }, 800)
        setTimeout(() => {
            assert.equal(fileCache.get("tankForever"), null);
            assert.equal(fileCache.get("tankAdd"), "add");
            fileCache.flushByPrefix("tank")
            assert.equal(fileCache.getKeys().length, 1)
            fileCache.forgetByKeys(['noTankPullXX'])
            assert.equal(fileCache.getKeys().length, 0)
            done();
        }, 1100)
    })

})
