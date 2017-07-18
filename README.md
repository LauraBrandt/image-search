Image Search Abstraction Layer
==============================
_By Laura Brandt_

This is one of the API projects for [FreeCodeCamp](https://www.freecodecamp.org/challenges/image-search-abstraction-layer).

View the live version:  
<https://nebula-hourglass.glitch.me/>

### User Stories:
* I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
* I can paginate through the responses by adding a ?offset=10 parameter to the URL.
* I can get a list of the most recently submitted search strings.

Search for images
-----------------
The search term goes at the end of the url:

`https://nebula-hourglass.glitch.me/api/<your seach term>`

You can add an optional `offset` paramater to indicate the number of search results to display on the page.

#### Example usage:
<https://nebula-hourglass.glitch.me/api/lolcats%20funny?offset=2>
#### Example output:
```json
[
  {
    "imageUrl": "http://www.oddee.com/_media/imgs/articles2/a97873_rsz_lolcat-funny-picture-found-pills-ate-eat.jpg",
    "snippet": "15 Funniest LOLcats Ever (LOLcats) - ODDEE",
    "pageUrl": "http://www.oddee.com/item_97873.aspx"
  },
  {
    "imageUrl": "https://i.ytimg.com/vi/r_o3q7zc21Y/hqdefault.jpg",
    "snippet": "LOLCats - Funniest cat pictures for Android - YouTube",
    "pageUrl": "https://www.youtube.com/watch?v=r_o3q7zc21Y"
  }
]
```

Show recent searches:
---------------------
#### Example usage:
<https://nebula-hourglass.glitch.me/api/latest>
#### Example output:
```json
[
  {
    "term": "lolcats funny",
    "when": "Tue Jul 18 2017 18:39:01 GMT+0000 (UTC)"
  },
  {
    "term": "roses",
    "when": "Tue Jul 18 2017 18:38:44 GMT+0000 (UTC)"
  },
  {
    "term": "puppy",
    "when": "Tue Jul 18 2017 18:38:39 GMT+0000 (UTC)"
  },
  {
    "term": "cute babies",
    "when": "Tue Jul 18 2017 18:38:32 GMT+0000 (UTC)"
  },
  {
    "term": "lolcats funny",
    "when": "Tue Jul 18 2017 18:38:19 GMT+0000 (UTC)"
  }
]
```