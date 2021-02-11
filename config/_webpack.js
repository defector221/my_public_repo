const fs = require('fs');
const path = require('path');
logger = require('../logger');

var manifest = {};
var USE_MANIFEST = false;

function initialize(){
    let rawdata = fs.readFileSync(path.resolve("public", "static", 'webpack-common-manifest.json'));
    manifest = JSON.parse(rawdata);
}

function getManifest(){
    return manifest
}

function enableMaifest(){
    USE_MANIFEST = true
}

function isManiFest(){
    return USE_MANIFEST;
}

function getManifest(){
    return manifest;
}

module.exports = {
    USE_MANIFEST: isManiFest,
    ASSET_MANIFEST: getManifest,
    initialize,
    enableMaifest
};