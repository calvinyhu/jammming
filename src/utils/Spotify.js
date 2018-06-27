const proxyurl = "https://cors-anywhere.herokuapp.com/";
const clientId = "c2548b91921142a6b081fa5d419cec1b";
const redirectUrl = "http://localhost:3000/";
const accessTokenRegex = "access_token=([^&]*)";
const expireTimeRegex = "expires_in=([^&]*)";
let accessToken = null;
let expireTime = null;

const Spotify = {
    getAccessToken() {
        if (accessToken)
            return accessToken;
        else {
            const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
            return fetch(proxyurl + url)
            .then(function(response) {
                if (response.ok) {
                    console.log("Response ok.");
                    return response.url;
                }
                console.log("Response not ok.");
                return null;
            })
            .then(function(url) {
                const authorizationUrl = (url).substring(proxyurl.length);
                window.location = authorizationUrl;
                const responseUrl = window.location.href;
                accessToken = responseUrl.match(accessTokenRegex)[1];
                expireTime = responseUrl.match(expireTimeRegex)[1];
                console.log("URL: " + url);
                console.log("Access Token: " + accessToken);
                console.log("Expire Time: " + expireTime);
                return accessToken;
            });
        }
    },
    search(searchTerm) {
        if (!accessToken) {
            console.log("Getting Access Token!");
            accessToken = this.getAccessToken();
            // console.log("Access Token 2: " + accessToken);
        }
        
        // console.log("Searching!");
        // return fetch(`https://api.spotify.com/v1/search?type=${searchTerm}`, {
        //     headers: { Authorization: `Bearer ${accessToken}` }
        // }).then(promiseResponse => {
        //     return promiseResponse.json();
        // }).then(jsonResponse => {
        //     console.log(jsonResponse);
        // });
    }
};

export default Spotify;
