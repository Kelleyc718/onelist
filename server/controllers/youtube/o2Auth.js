'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const opn = require('opn');
const destroyer = require('server-destroy');
const {google} = require('googleapis');

/**
 * To use OAuth2 authentication, we need access to a a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI.  To get these credentials for your application, visit https://console.cloud.google.com/apis/credentials.
 */
const keyPath = path.join(__dirname, 'oauth2.keys.json');
let keys = { redirect_uris: [''] };
if (fs.existsSync(keyPath)) {
    keys = require(keyPath).web;
}

/**
 * Create a new OAuth2 client with the configured keys.
 */
export const oauth2Client = new google.auth.OAuth2(
    keys.client_id,
    keys.client_secret,
    keys.redirect_uris[0]
);

/**
 * This is one of the many ways you can configure googleapis to use authentication credentials.  In this method, we're setting a global reference for all APIs.  Any other API you use here, like google.drive('v3'), will now use this auth client. You can also override the auth client at the service and method call levels.
 */
google.options({ auth: oauth2Client });

/**
 * Open an http server to accept the oauth callback. In this simple example, the only request to our webserver is to /callback?code=<code>
 */

export async function o2Auth() {
    return new Promise((resolve, reject) => {
        // grab the url that will be used for authorization
        const authorizeUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/youtube'
        });
        const server = http.createServer(async (req, res) => {
            try {
                if (req.url.indexOf('/oauth2callback') > -1) {
                    const qs = querystring.parse(url.parse(req.url).query);
                    console.log(qs);
                    res.end('Authentication successful! Please return to the console.');
                    server.destroy();
                    const {tokens} = await oauth2Client.getToken(qs.code);
                    console.log(tokens);
                    oauth2Client.setCredentials = tokens;
                    resolve(oauth2Client);
                }
            } catch (e) {
                reject(e);
            }
        }).listen(3001, () => {
            // open the browser to the authorize url to start the workflow
            opn(authorizeUrl, {wait: false}).then(cp => cp.unref());
        });
        destroyer(server);
    });
}

async function runSample () {
    console.log(oauth2Client.getAccessToken());
    // the first query will return data with an etag
    const res = await getPlaylistData(null);
    const etag = res.data.etag;
    console.log(`etag: ${etag}`);

    // the second query will (likely) return no data, and an HTTP 304
    // since the If-None-Match header was set with a matching eTag
    const res2 = await getPlaylistData(etag);
    console.log(res2.status);
}

async function getPlaylistData (etag) {
    // Create custom HTTP headers for the request to enable use of eTags
    const headers = {};
    if (etag) {
        headers['If-None-Match'] = etag;
    }
    const res = await youtube.playlists.list({
        part: 'id, snippet',
        id: 'PLIivdWyY5sqIij_cgINUHZDMnGjVx3rxi',
        headers: headers
    });
    console.log('Status code: ' + res.status);
    console.log(res.data);
    return res;
}

const scopes = [
    'https://www.googleapis.com/auth/youtube'
];


o2Auth()
    .then(c => runSample())
    .catch(console.error);



