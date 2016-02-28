
### package
```
{  "name": "es6_legano"
,  "version": "0.0.3"
,  "description": "legano - not legato machine data reading with eventsource"
,  "main": "server.js"
,  "dependencies": {}
,  "devDependencies": {}
,  "scripts": { "start": "node server.js" }
,  "author": "bill.finger"
,  "license": "Free"
,  "config":{"table":"fabs"     // entry point of multi indexed memdb
            ,"data":"fabs.lst"  // rest api memory db, serialization
            ,"webport":8090     // port for web based access
            ,"udpport":8877
            ,"splkport":8878
            ,"splkhost":"localhost"
            ,"host":"*"
            ,"simulation":true  // simulation, NOT machine connection
            ,"log":true         // log data
            }
}
```

### structure

|component|description|
|---|---|
|strigger|shift change, |
|mtrigger|end of month end of period|
|hteilio|history io parts|
|hteilnio|history nio parts|
|htimes|history of stimes, build after shift change|
|stimes|operating states in minutes along shift|
|hteilabs|history parts io minus parts soll in shift|
|hteilabsp|see hteilabs in percent|
