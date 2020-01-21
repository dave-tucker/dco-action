"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dcoRegex = RegExp(/^Signed-off-by: ([^<]+) <([^<>@]+@[^<>]+)>$/, 'gm');
const dockerDcoRegex = RegExp(/^Docker-DCO-1\.1-Signed-off-by: ([^<]+) <([^<>@]+@[^<>]+)>( \(github: ([a-zA-Z0-9][a-zA-Z0-9-]+)\))?$/, 'gm');
function checkSignOff(message) {
    return dcoRegex.test(message) || dockerDcoRegex.test(message);
}
exports.checkSignOff = checkSignOff;
