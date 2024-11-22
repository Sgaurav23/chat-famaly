#!/usr/bin/env node

const http = require('http');
const humanize = require('./humanize');

const url = process.argv[2] || 'http://www.google.com';

const t0 = new Date();
http.request(new URL(url), (res) => {
    let bits = 0;
    let t1;
    res.on('data', (chunk) => {
        bits += chunk.length * 8;
        t1 = new Date();
        report();
    });
    res.on('end', () => {
        t1 = new Date();
        console.log('---');
        report();
    });

    function report() {
        const seconds = (t1 - t0) / 1000;
        const bitsPerSecond = bits / seconds;
        console.log(`${humanize(bitsPerSecond)}b/s`);
    }
}).end();
