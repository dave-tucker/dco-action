"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const dco_1 = require("./dco");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = core.getInput('myToken');
            const dcoLink = core.getInput('dcoLink');
            const prNumber = getPrNumber();
            if (!prNumber) {
                console.log('Could not get pull request number from context, exiting');
                return;
            }
            const client = new github.GitHub(token);
            core.debug("Getting commits for PR");
            checkDCO(client, prNumber);
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
function checkDCO(client, prNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        const { status, data: commits } = yield client.pulls.listCommits({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            pull_number: prNumber
        });
        if (status != 200) {
            throw new Error(`Received unexpected API status code ${status}`);
        }
        for (const commit of commits) {
            let signedOff = dco_1.checkSignOff(commit.commit.message);
            if (!signedOff) {
                return false;
            }
        }
        return true;
    });
}
function getPrNumber() {
    const pullRequest = github.context.payload.pull_request;
    if (!pullRequest) {
        return undefined;
    }
    return pullRequest.number;
}
run();
