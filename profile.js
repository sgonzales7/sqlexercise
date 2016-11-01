// 1) Require http

// 2) Connect to the API URL ( https://api.github.com/users/{username} )

// 3) Print out data if user is found
        // a) profile image
        // b) username
        // c) public repo count
        // d) followers count

// 4) Output the Error if user is not found

var request = require('request');

function get(){
    var url="https://api.github.com/users/sgonzales";

    var options = {
        url: url,
        headers: {
            'User-Agent': 'request'
        }
    }
    request(options, callback);
}

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log("Image: " + info.avatar_url);
        console.log("Username: " + info.login);
        console.log("Public Repo Count" + info.public_repos);
        console.log("Followers Count" + info.followers);
    }else{
        console.log("Username not found");
    }
}

module.exports.get = get;
