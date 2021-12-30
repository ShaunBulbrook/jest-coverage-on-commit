# Jest coverage on commit

This action will run your jest tests, generate a coverage report and publish that report as a comment onto the commit that was last pushed.
There are many other actions that will publish a coverage report onto a PR. If you are using a trunk-based workflow or you want to monitor coverage over time instead of using it as a gate, you may find this action preferable to what is already on offer.

For those using a mono-repo, you can call this action multiple times for each service/package that you wish to test. A new report will be generated for each and nothing will be deleted.

