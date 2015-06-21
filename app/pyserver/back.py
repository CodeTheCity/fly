import urllib, json, time, random, sys


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
        
    #print len(dt)
    #return c5
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
    

def puttofile(cr,n):
    f=open("dat.json","w")
    json.dump({"species":cr,"time":int(n*1000)},f)
    f.close()

nt=get5Creatures()
while 1:
    nc = time.time()+300

    puttofile(nt,nc)

    nt=get5Creatures()

    while time.time() < nc:
        sys.stdout.write("\rNext quests in: "+ str(int((nc-time.time())//3600)) +"h "+ str(int(((nc-time.time())//60)%60)) +"m "+ str(int((nc-time.time())%60)) +"s            ")

    


