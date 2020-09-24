# Is PR Mergeable Action

This action retrieves the mergable state of a PR using a PR number

## Inputs

### `pull_number`

**Required** The pull request to query.

## Outputs

### `mergable_status`

One of the values here https://developer.github.com/v4/enum/mergestatestatus/

## Example usage

```yaml
uses: arup-group/action-is-pr-mergable@main
with:
  pull_number: {{ github.event.pull_request.number }}
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
