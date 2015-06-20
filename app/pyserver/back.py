import urllib, json, time, random


def get5Creatures():
    
    c = json.loads(urllib.urlopen("http://edinburghopendata.info/api/action/datastore_search?resource_id=8090096e-16aa-43cc-93ae-bfb4acb8cc54&limit=1024").read())

    if c["success"] != True:
        raise ValueError
    
    c=c["result"]
    
    c5 = {}
    
    dt = {}
    
    for i in xrange(5):
        cc = c["records"][random.randint(0,len(c["records"])-1)]
        c5[i] = {"name":cc["Common name"],"latin":cc["Scientific name"],"type":cc["Group"]}
        dt[c5[i]["name"]]=0
        
    if len(dt) == 5:
        return c5
    else:
        print "DUPLICATES"
        return get5Creatures()
    
def getTypes():
    c = json.loads(urllib.urlopen("http://edinburghopendata.info/api/action/datastore_search?resource_id=8090096e-16aa-43cc-93ae-bfb4acb8cc54&limit=1024").read())["result"]
    
    d = {}
    
    #print c["records"]
    
    for i in xrange(len(c["records"])):
        d[c["records"][i]["Group"]]=0
        
    for i in d.keys():
        print i
    
getTypes()
