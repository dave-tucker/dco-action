import * as core from '@actions/core';
import * as github from '@actions/github';
import {checkSignOff} from './dco'

async function run() {
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
}

async function checkDCO(client: github.GitHub, prNumber: number) : Promise<boolean> {
  const { status, data: commits } = await client.pulls.listCommits({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    pull_number: prNumber
  });

  if (status != 200) {
    throw new Error(`Received unexpected API status code ${status}`);
  }

  for (const commit of commits) {
    let signedOff = checkSignOff(commit.commit.message);
    if (!signedOff) {
      return false;
    }
  }
  return true;
}

function getPrNumber(): number | undefined {
  const pullRequest = github.context.payload.pull_request;
  if (!pullRequest) {
      return undefined;
  }
  return pullRequest.number;
}

run()