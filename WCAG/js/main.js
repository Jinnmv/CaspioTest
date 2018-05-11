
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
      
        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");
      
        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < columns.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = columns[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < results.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < columns.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = results[i][columns[j]];
            }
        }
      
        return table;
    }
  
  
// Call to function with anonymous callback
loadJSON(function(response) {
    // Do Something with the response e.g.
    //jsonresponse = JSON.parse(response);
    console.log('json loaded');
    
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(jsonToTable(response));
    
    // Assuming json data is wrapped in square brackets as Drew suggests
    //console.log(jsonresponse[0].name);

});

})();
