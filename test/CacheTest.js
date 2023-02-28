const describe = require('mocha').describe;
const FileCache = require("../FileCache")

const assert = require("assert");

describe('CacheTest', () => {

    it("fileCacheTest", (done) => {
        const fileCache = new FileCache()
        fileCache.Store("tank","man",1)
        assert.equal(fileCache.Get("tank"),"man");
        fileCache.Store("tankPull","pull",1)
        assert.equal(fileCache.Pull("tankPull"),"pull")
        assert.equal(fileCache.Get("tankPull"),null)
        fileCache.Forever("tankForever","forever")
        fileCache.Add("tankAdd","add",60*60*24)
        assert.equal(fileCache.Get("tankPull"),null)
        setTimeout(()=>{
            assert.equal(fileCache.Get("tank"),"man");
            assert.equal(fileCache.Get("tankForever"),"forever");
            fileCache.Forget("tankForever")
        },800)
        setTimeout(()=>{
            assert.notEqual(fileCache.Get("tank"),"man");
            assert.equal(fileCache.Get("tankForever"),null);
            assert.equal(fileCache.Get("tankAdd"),"add");
            done();
        },1100)
    })

})
