'use strict';

var google = require('googleapis');
var customsearch = google.customsearch('v1');

var recentSearches = [];

var maxLengthRecentSearches = 10;
var defaultResultsLength = 10;
    
module.exports = function(app) {
    app.get("/", function(req, res) {
        res.sendFile(process.cwd() + "/public/index.html");
    });
    
    app.get('/api/latest', function(req, res) {
        console.log('Showing most recent searches...');
        res.end(JSON.stringify(recentSearches, null, 2));
    });
    
    app.get('/api/:searchTerm', function(req, res) {
        var searchTerm = req.params.searchTerm;
        var resultsLength = req.query.offset ? req.query.offset : defaultResultsLength;

        console.log("Searching images for '" + searchTerm + "'. Displaying " + resultsLength + " results per page.");
        
        // Update recentSearches array
        recentSearches.unshift({"term": searchTerm, "when": new Date().toString()});
        if (recentSearches.length > maxLengthRecentSearches) {
            recentSearches.pop();
        }
        
        // Search for images
        var imageResults = [];
        
        var cx = process.env.CSE_ID;
        var api = process.env.API_KEY;
        
        var numResultsLeft = resultsLength;
        var numResultsCurrent;
        var needMoreResults = true;
        
        getImageResults();
        
        function getImageResults() {
            // Google Custom Search can only get 10 results at a time
            if (numResultsLeft > 10) {
                numResultsCurrent = 10;
                numResultsLeft -= 10;
            }
            else {
                numResultsCurrent = numResultsLeft;
                needMoreResults = false;
            }
            customsearch.cse.list({ cx: cx, auth: api, q: searchTerm, searchType: "image", num: numResultsCurrent}, function (err, resp) {
                if (err) console.error(err);
                
                resp.items.forEach(function(result) {
                    imageResults.push({
                        "imageUrl" : result.link,
                        "snippet" : result.snippet,
                        "pageUrl" : result.image.contextLink
                    });
                }); 
            
                if (needMoreResults) {
                    // Repeat until all results gotten
                    getImageResults();
                } else {
                    // Output result
                    res.end(JSON.stringify(imageResults, null, 2));
                }
                
            });
        }
    });

};