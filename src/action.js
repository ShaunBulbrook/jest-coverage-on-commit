import core from '@actions/core'
import github from '@actions/github'

async function run() {
	const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
	const octokit = github.getOctokit(GITHUB_TOKEN);
	const {context = {}} = github;
  console.log("🚀 ~ file: action.js ~ line 8 ~ run ~ context", context)
	console.log("hello, wowrld!");
}

run();
