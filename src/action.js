const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
	const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
	const octokit = github.getOctokit(GITHUB_TOKEN);
	const {context = {}} = github;
  console.log("🚀 ~ file: action.js ~ line 8 ~ run ~ context", context)
  console.log("🚀 ~ file: action.js ~ line 8 ~ run ~ context", context.payload.commits)
	console.log("hello, wowrld!");
}

run();
