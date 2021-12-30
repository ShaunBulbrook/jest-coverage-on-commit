const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
	const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
	const octokit = github.getOctokit(GITHUB_TOKEN);
	const {context = {}} = github;
  console.log("🚀 ~ file: action.js ~ line 8 ~ run ~ context", context)
  console.log("🚀 ~ file: action.js ~ line 8 ~ run ~ context", context.payload.commits)
	console.log("hello, wowrld!");
	await writeComment(context.repository.full_name, context.head_commit.id, "hello world")
}

/**
 *
 * @param {string} repoName full name of the repository. ex: "biggles8777/hello-world"
 * @param {string} commitSha sha for the commit that needs a comment added to it
 * @param {string} commentContent content for the comment that will be sent
 */
const writeComment = async (repoName, commitSha, commentContent) => {
	const [owner, repo] = repoName.split('/');
	await octokit.rest.repos.createCommitComment({
      owner: owner,
      repo: repo,
      commit_sha: commitSha,
      body: inputs.body,
    });
}

run();
