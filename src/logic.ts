import {ActionContext} from './action-context'
import * as util from 'util'

export async function isMergable(actionContext: ActionContext): Promise<void> {
  try {
    if (!actionContext.context.payload.pull_request)
      throw Error('This action only works if the trigger is a pull request')

    const pullRequest = await actionContext.octokit.pulls.get({
      ...actionContext.context.repo,
      pull_number: actionContext.context.payload.pull_request.number
    })

    actionContext.debug(util.inspect(pullRequest.data, true, 10))

    actionContext.setOutput(
      'mergeable',
      pullRequest.data.mergeable ? 'true' : 'false'
    )
  } catch (error) {
    actionContext.setFailed(error.message)
  }
}
