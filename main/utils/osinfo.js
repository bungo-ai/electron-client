"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.OSInfo = void 0;

const os = require('os');

class OSInfo {
    static get() {
        return {
            hostname: os.hostname(),
            platform: os.platform(),
            arch: os.arch(),
            release: os.release(),
            type: os.type(),
            version: os.version(),
            nullPath: os.devNull,
            homedir: os.homedir(),
            tempdir: os.tmpdir(), // Note: tmpdir is a function, so it should be os.tmpdir() instead of os.tempdir
            freeMemory: os.freemem(),
            totalMemory: os.totalmem(),
            lineEnding: os.EOL,
        };
    }
}

exports.OSInfo = OSInfo;
