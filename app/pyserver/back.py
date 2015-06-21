import urllib, json, time, random, sys, pymongo


def get5Creatures():
    
    c = json.loads(urllib.urlopen("http://edinburghopendata.info/api/action/datastore_search?resource_id=8090096e-16aa-43cc-93ae-bfb4acb8cc54&limit=1024").read())

    if c["success"] != True:
        raise ValueError
    
    c=c["result"]
    
    c5 = {}
    
    dt = {}
    
    for i in ("0","1","2","3","4"):
        cc = c["records"][random.randint(0,len(c["records"])-1)]
        c5[i] = {"name":cc["Common name"],"latin":cc["Scientific name"],"type":cc["Group"],"desc":"","img":"","id":cc["_id"]}
        fixedlatin=""
        inbk = False
        for letter in c5[i]["latin"]
            if letter = "(":
                inbk = True
            elif letter = ")":
                inbk = False
            elif not inbk:
                fixedlatin += letter
        c5[i]["latin"]=" ".join(fixedlatin.split())
        
        gbif = json.loads(urllib.urlopen("http://api.gbif.org/v1/species?name="+c5[i]["latin"].replace(" ","%20")+"&limit=1").read())
        #print "http://api.gbif.org/v1/species?name="+c5[i]["latin"].replace(" ","%20")+"&limit=1"
        
        
        #print i
        try:
            if len(gbif["results"])==1:
                gbif_id=str(gbif["results"][0]["key"])
                #print c5[i]["latin"]
                #print i
                #print gbif_id
                gbif_desc = json.loads(urllib.urlopen("http://api.gbif.org/v1/species/"+gbif_id+"/descriptions").read())
                for desc in gbif_desc["results"]:
                    if "language" in desc.keys() and "description" in desc.keys() and desc["language"]=="eng":
                        c5[i]["desc"]=desc["description"]
                        break
        except:
            pass
        
        
        
        """
        try:
            eol_s = json.loads(urllib.urlopen("http://eol.org/api/search/"+c5[i]["latin"]+".json").read())
            if eol_s["totalResults"]>0:
                eol_id = str(eol_s["results"][0]["id"])
                eol_p = json.loads(urllib.urlopen("http://eol.org/api/pages.json?id="+eol_id+"&text=0&videos=0").read())
                #print eol_p
                if len(eol_p["dataObjects"]) > 0 and "mediaURL" in eol_p["dataObjects"][0].keys():
                    c5[i]["img"] = eol_p["dataObjects"][0]["mediaURL"]
        except:
            pass        
        """
        
        try:
            c5[i]["img"]=json.loads(urllib.urlopen("http://api.pixplorer.co.uk/getimage/"+c5[i]["latin"]).read())["imglink"]
        except:
            pass
        
        
        
        
        
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
    #f=open("dat.json","w")
    j={"species":cr,"time":int(n*1000),"_id":1000000}
    client = pymongo.MongoClient("mongodb://codethecity:edinburghapps@ds049570.mongolab.com:49570/fly")
    db = client["fly"]
    db.posts.remove({"_id":1000000})
    i=db.posts.insert_one(j).inserted_id
    #print i
    #f.close()

nt=get5Creatures()
while 1:
    nc = time.time()+300

    puttofile(nt,nc)

    nt=get5Creatures()

    while time.time() < nc:
        sys.stdout.write("\rNext quests in: "+ str(int((nc-time.time())//3600)) +"h "+ str(int(((nc-time.time())//60)%60)) +"m "+ str(int((nc-time.time())%60)) +"s            ")
        #pass

    


