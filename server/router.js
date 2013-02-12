module.exports = function(app,express,tescoUser) {
    var https = require('https');

    app.get('/',function(request, response){
        console.log("/ User"+JSON.stringify(tescoUser));
        response.render('index',{title:app.get('name'),user: {name: tescoUser.name}});
    });

    var tescoApiRequest = function(tescoRequest,next){


        var tescoLoginRequest = {
            hostname:tescoRequest.hostname,
            path:tescoRequest.path+tescoRequest.command,
            method:'GET'
        }
        console.log("TescoApiRequest:"+tescoLoginRequest.path);

        var req = https.request(tescoLoginRequest, function(res){
            console.log("statusCode: ", res.statusCode);
            console.log("headers: ", res.headers);

            var data = '';
            res.on('data', function(chunkedData) {
                data += chunkedData
                //process.stdout.write(chunkedData);
            });

            res.on('end',function(){
                next(data);
            });
        });
        req.end();


        req.on('error', function(e) {
            console.error(e);
        });
    }

    var tescoProductSearchRequest = function(query,next){
        var sessionKey = '&sessionKey='+tescoUser.sessionKey;
        var searchCommand = '&searchText='+query+'&page=1'+sessionKey;

        console.log("Search Command:"+searchCommand);

        var tescoRequest = {};

        tescoRequest.hostname = 'secure.techfortesco.com';
        tescoRequest.path = '/groceryapi/restservice.aspx?command=PRODUCTSEARCH';
        tescoRequest.command=searchCommand;

        tescoApiRequest(tescoRequest,function(data){
            next(data);

        });
    }

    var tescoLoginRequest = function(next){
        var developerKey = '&developerkey=&applicationkey='
        var loginCommand = '&email=&password='+developerKey;

        var tescoRequest = {};

        tescoRequest.hostname = 'secure.techfortesco.com';
        tescoRequest.path = '/groceryapi/restservice.aspx?command=LOGIN';
        tescoRequest.command=loginCommand;

        tescoApiRequest(tescoRequest,function(data){
            console.log('Received Authentication data:'+data);
            var dataAsJson = JSON.parse(data);
            tescoUser = {name:dataAsJson.CustomerName,sessionKey:dataAsJson.SessionKey};
            next(tescoUser);

        });
    }

    app.get('/login',function(request, response){
        console.log("/login User"+JSON.stringify(request.user));

        tescoLoginRequest(function(authenticatedUser){
           console.log("tescoLoginRequest returned:");
            response.render('index',{title:app.get('name'),user: {name:authenticatedUser.name}});
        });

    });

    app.get('/productSearch',function(request, response){
        console.log("/productSearch User"+JSON.stringify(tescoUser));

        var search = request.query["searchString"];
        if(search.indexOf(' ') >0)
            search ="+"+search.replace(/ /g,'+');



        tescoProductSearchRequest(search,function(data){
            var tescoProductDataFactory = require('./Factories/TescoProductDataFactory');
            var searchView = tescoProductDataFactory.getProductSearchView(JSON.parse(data));
            console.log("SearchView:"+JSON.stringify(searchView));
            response.render('productSearch',{title:app.get('name'),user: request.user,productSearchResults:searchView});
        });

    });
}
