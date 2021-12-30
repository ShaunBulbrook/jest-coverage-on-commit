const github = require('@actions/github')
const core = require('@actions/core')
const { exec } = require('@actions/exec')
const { resolve, join, sep } = require('path')

async function run () {
  // Check Token
  const token = process.env.GITHUB_TOKEN
  // if (token === undefined) {
  // 	core.error("GITHUB_TOKEN not set.")
  // 	core.setFailed("GITHUB_TOKEN not set.")
  // 	return
  // }

  // Set working directory
  const workingDirectory = resolve(core.getInput('working-directory')) + sep
  const resultsFile = join(workingDirectory, ('jest.results.json'))

  await runJest(getJestCommand(resultsFile), workingDirectory)

  const { context } = github
  await writeComment(context.payload.repository.full_name, context.payload.head_commit.id, 'hello world')
}

/**
 *
 * @param {string} repoName full name of the repository. ex: "biggles8777/hello-world"
 * @param {string} commitSha sha for the commit that needs a comment added to it
 * @param {string} commentContent content for the comment that will be sent
 */
const writeComment = async (repoName, commitSha, commentContent) => {
  const [owner, repo] = repoName.split('/')
  const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN')
  const octokit = github.getOctokit(GITHUB_TOKEN)
  await octokit.rest.repos.createCommitComment({
    owner: owner,
    repo: repo,
    commit_sha: commitSha,
    body: commentContent
  })
}

// Ripped from https://github.com/mattallty/jest-github-action/blob/master/src/action.ts
function getJestCommand (resultsFile) {
  let cmd = core.getInput('test-command', { required: false })
  const jestOptions = `--testLocationInResults --json --coverage --outputFile=${resultsFile}`
  const shouldAddHyphen = cmd.startsWith('npm') || cmd.startsWith('npx') || cmd.startsWith('pnpm') || cmd.startsWith('pnpx')
  cmd += (shouldAddHyphen ? ' -- ' : ' ') + jestOptions
  core.debug('Final test command: ' + cmd)
  return cmd
}

async function runJest (cmd, cwd) {
  try {
    await exec(cmd, [], { cwd })
    console.debug('Jest command executed')
  } catch (e) {
    console.error('Tests have likely failed.', e)
    throw new Error('Operation Failed')
  }
}

run()
