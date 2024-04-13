#!/usr/bin/env node

const process = require("process")
const axios = require("axios")

const slackNotifier = async (channel, { message = "", block = null } = {}) => {
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
    } else if (block) {
      payload = { blocks: block, channel: channel } // Ensure block is an array of structured data for Slack blocks
    } else {
      throw new Error("Either a message or a block must be provided.")
    }

    await axios.post(webhookUrl, payload)
    console.log(`Message successfully sent to ${channel}`)
  } catch (error) {
    console.error(`Failed to send message to ${channel}:`, error)
  }
}

if (require.main === module) {
  const [, , channel, message] = process.argv
  slackNotifier(channel, { message }).catch(console.error)
}

module.exports = { slackNotifier }
