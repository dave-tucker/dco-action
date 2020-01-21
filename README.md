# DCO Action

This checks that commits included in a Pull Request have been signed off.

TODO: Post PR Comment when DCO check fails
TODO: Add DCO labels to PRs

## Inputs

### `dcoLink`

**Required** URL which describes sign off rules for a project. Default `"https://github.com/linuxkit/linuxkit/blob/master/CONTRIBUTING.md#sign-your-work"`

## Example usage

```yaml
uses: linuxkit/actions/dco@v1
with:
  token: ${{ secrets.GITHUB_TOKEN }}
  dcoLink: 'https://github.com/your/project/CONTRIBUTING.md#sign-your-work'
```