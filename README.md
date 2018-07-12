# [![image](https://cloud.githubusercontent.com/assets/6495166/26699859/947f4466-471b-11e7-9d82-9f0db072a675.png)](https://cimonitor.readthedocs.io) CIMonitor

The CIMonitor is a place where all your project statuses come together. Check if all tests have passed, and if
deployments are successful. All in one overview.

The time that deployments were scary is over, lets make them FUN!

## Features

- A **real-time dashboard** of your events and pipelines
- Add a **GitLab webhook endpoint** to push all **pipeline and build statuses** with ease!

## Local development

In order to run the application you need:

- `yarn`
- `node`: version 8 or higher

To start development run:

- `yarn start`
- `yarn watch`: Will auto-refresh if the monitor code changes, you need to restart the server manually

## Running production

In order to run the application in production you need:

- `yarn`
- `node`: version 8 or higher

To start development run:

- `yarn production`
- `yarn start`

We recommend that you run the application with `pm2` so the application will restart if your computer reboots.
