'use strict';

var recentSearches = [];
var maxLengthRecentSearches = 10;
    
module.exports = function(app) {
    app.get("/", function(req, res) {
        res.sendFile(process.cwd() + "/public/index.html");
    });
    
    app.get('/api/:searchTerm', function(req, res) {
        var searchTerm = req.params.searchTerm;
        var resultsLength = req.query.offset ? req.query.offset : 10;
        
        console.log("Searching images for '" + searchTerm + "'. Displaying " + resultsLength + " results per page.");
        
        // Update recentSearches array
        recentSearches.unshift({"term": searchTerm, "when": new Date().toString()});
        if (recentSearches.length > maxLengthRecentSearches) {
            recentSearches.pop();
        }
        
        // Search for images
        
        
        // Output result
        res.end(JSON.stringify({}, null, 2));
    });
    
    app.get('/api/latest', function(req, res) {
        console.log('Showing most recent searches...');
        res.end(JSON.stringify(recentSearches, null, 2));
    });

};