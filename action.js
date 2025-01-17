const Jira = require('./common/net/Jira')

module.exports = class {
  constructor ({ githubEvent, argv, config }) {
    this.Jira = new Jira({
      baseUrl: config.baseUrl,
      token: config.token,
      email: config.email,
    })

    this.config = config
    this.argv = argv
    this.githubEvent = githubEvent
  }

  async execute () {
    const issueId = this.argv.issue || this.config.issue || null
    const { comment, role_name, role_id } = this.argv

    console.log(`Adding comment to ${issueId}: \n${comment}`)
    await this.Jira.addComment(issueId, {
      body: comment,
      visibility: {
        type: 'role',
        value: role_name,
        identifier: role_id
      }
    })

    return {}
  }
}
