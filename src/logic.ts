import {ActionContext} from './action-context'
import * as util from 'util'
import {getInput} from '@actions/core'

export async function isMergable(actionContext: ActionContext): Promise<void> {
  try {
    const pullNumberString = getInput('pull_number')

    if (!pullNumberString)
      throw Error('This action only works if a PR number is given')

    const pull_number = Number(pullNumberString)

    const pullRequest = await actionContext.octokit.pulls.get({
      ...actionContext.context.repo,
      pull_number
    })

    actionContext.debug(util.inspect(pullRequest.data, true, 10))

    actionContext.setOutput('mergeable_state', pullRequest.data.mergeable_state)
  } catch (error) {
    actionContext.setFailed(error.message)
  }
}
