"use strict";

import fs from 'fs';
import readline from 'readline';
import {google} from 'googleapis';
import googleAuth from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

const SCOPES = ['https://www.googleapis.com/auth/youtube.force-ssl'];

const TOKEN_DIR = (process.env.HOME ||
    process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';

const TOKEN_PATH = TOKEN_DIR + 'google-apis-nodejs-quickstart.json';

const playlistsListByChannelId = (auth, requestData) => {
    let service = google.youtube('v3');
    let parameters = removeEmptyParameters(requestData['params']);
    parameters['auth'] = auth;
    service.playlists.list(parameters, function(err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        console.log(response);
    });
}

//See full code sample for authorize() function code.
authorize(JSON.parse(content), {'params': {'channelId': 'UC_x5XG1OV2P6uZZ5FSM9Ttw',
        'maxResults': '25',
        'part': 'snippet,contentDetails'}}, playlistsListByChannelId);