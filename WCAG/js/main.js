
(function() {
  
    var locale_file = 'en.json';
  
    function loadJSON(callback) {

        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', locale_file, true);
        xobj.onreadystatechange = function() {
            if (xobj.readyState == 4 && xobj.status == 200) {
                // .open will NOT return a value but simply returns undefined in async mode so use a callback
                callback(xobj.responseText);
            }
        }
        xobj.send(null);
    }

    function jsonToTable(json) {
        var results = JSON.parse(json);
        
        // EXTRACT VALUE FOR HTML HEADER
        var columns = [];
        for (var i = 0; i < results.length; i++) {
            for (var key in results[i]) {
                if (columns.indexOf(key) === -1) {
                    columns.push(key);
                }
            }
        }
        return columns;
    }
  
  
// Call to function with anonymous callback
loadJSON(function(response) {
    // Do Something with the response e.g.
    //jsonresponse = JSON.parse(response);
    console.log('json loaded');
    
    console.log(jsonToTable(response));
    
    // Assuming json data is wrapped in square brackets as Drew suggests
    //console.log(jsonresponse[0].name);

});

})();
