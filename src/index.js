#!/usr/bin/env node

const process = require("process")
const { exec } = require("child_process")
const axios = require("axios")

const notificationSound =
  "mpv /home/thomas/dotfiles/gruvbox-95/sounds/st-notification.mp3"

const slackNotifier = async (channel, message, blocks) => {
  try {
    const webhooks = {
      test: process.env.SLACK_WEBHOOK_TEST,
      backups: process.env.SLACK_WEBHOOK_BACKUPS,
      eolas: process.env.SLACK_WEBHOOK_EOLAS,
      systems_obscure: process.env.SLACK_WEBHOOK_SYSTEMS_OBSCURE,
      time_tracking: process.env.SLACK_WEBHOOK_TIME_TRACKING,
    }

    const webhookUrl = webhooks[channel]

    let payload

    if (message) {
      payload = { text: message, channel: channel }
    }

    if (blocks) {
      payload = { blocks: blocks, channel: channel } // Ensure block is an array of structured data for Slack blocks
    }

    const response = await axios.post(webhookUrl, payload)
    if (response.status === 200) {
      exec(notificationSound)
      console.info(`Message successfully sent to ${channel}`)
    } else {
      console.error(
        `Slack API returned non-200 response: ${response.status}`,
        response.data
      )
    }
  } catch (error) {
    console.error(`Failed to send message to ${channel}:`, error)
  }
}

if (require.main === module) {
  const [, , channel, message, blocks] = process.argv
  slackNotifier(channel, message, blocks).catch(console.error)
}

module.exports = { slackNotifier }
