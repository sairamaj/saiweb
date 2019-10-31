var fetchUrl = require("fetch").fetchUrl;

const techTipsUrl = "https://saitech.azurewebsites.net/api/techtips/?q=cert";
const techTipsSearchUrl = "https://techsearch.azurewebsites.net/api/TipsSearch/?q=cert";

// source file is iso-8859-15 but it is converted to utf-8 automatically
fetchUrl(techTipsUrl, function(error, meta, body){
    if( error ){
        console.log(error)
    }else{
        console.log(body.toString());
        console.log(meta)
    }
});

console.log("________________________________________________")

fetchUrl(techTipsSearchUrl, function(error, meta, body){
    if( error ){
        console.log(error)
    }else{
        console.log(body.toString());
        console.log(meta)
    }
});