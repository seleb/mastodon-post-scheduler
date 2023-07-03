# mastodon-post-scheduler

a basic web ui for scheduling posts on mastodon

## how to get an access token

- create/login to a mastodon account
- go to `Preferences > Development > New application`
- give it whatever name you'd like (this will show up in the app field of the post)
- include the scopes `read:statuses`, `write:media`, and `write:statuses`
- once created, select it and copy `Your access token`

## notes

- posts scheduled with this tool use your default settings for post visibility and language
- instances have their own post length/attachment limits, which this tool does not check for you
- this tool does not store any data: it fetches and posts on your behalf, but the actual scheduling is handled by your instance
- when posts are scheduled in the near future, your instance may post them immediately instead of scheduling them (default is <5min)
