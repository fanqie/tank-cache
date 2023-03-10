const describe = require('mocha').describe;
const FileCache = require("../FileCache")

const assert = require("assert");

describe('CacheTest', () => {

    it("fileCacheTest", (done) => {
        const fileCache = new FileCache()
        fileCache.Store("noTankPullXX","tankPullXX",60*60*24)

        fileCache.Store("xxx","man",1)
        fileCache.Store("tank","man",1)
        assert.equal(fileCache.Get("tank"),"man");
        fileCache.Store("tankPull","pull",1)

        //get and remove it (key:tankPull)
        assert.equal(fileCache.Pull("tankPull"),"pull")
        assert.equal(fileCache.Get("tankPull"),null)
        fileCache.Forever("tankForever","forever")
        fileCache.Add("tankAdd","add",60*60*24)

        assert.equal(fileCache.Get("tankPull"),null)
        assert.equal(fileCache.GetKeys().length,5)
        assert.equal(fileCache.GetKeys("tank").length,3)

        setTimeout(()=>{
            assert.equal(fileCache.Ttl("tank")>0,true);
            fileCache.incrementTll("tank",1000)
            assert.equal(fileCache.Ttl("tank")>1000,true)
            assert.equal(fileCache.Get("tank"),"man");
            assert.equal(fileCache.Get("tankForever"),"forever");
            fileCache.Forget("tankForever")

        },800)
        setTimeout(()=>{
            assert.equal(fileCache.Get("tankForever"),null);
            assert.equal(fileCache.Get("tankAdd"),"add");
            fileCache.FlushByPrefix("tank")
            assert.equal(fileCache.GetKeys().length,1)
            fileCache.ForgetByKeys(['noTankPullXX'])
            assert.equal(fileCache.GetKeys().length,0)
            done();
        },1100)
    })

})
