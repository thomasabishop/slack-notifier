# Slack Notifier

This is an executable NodeJS script that I use on my local system to send
messages via Slack webhooks. This allows me to keep a backed-up and
remotely-accessible record of notifications triggered by scheduled local
processes.

It can be called from the command line or via Bash and Python scripts.

It receives basic string messages or Slack "blocks" (for more comprehensive
outputs) and directs these to one of the following channels:

| Channel        | Function                                                   |
| -------------- | ---------------------------------------------------------- |
| #test          | For testing                                                |
| #backups       | Notify me about success/fail status of `rsnapshot` backups |
| #eolas         | Notify me about auto-commits in my [Zettelkasten]()        |
| #time_tracking | Register start/stop and durations of local time-tracking   |
