import React from 'react'
import PropTypes from 'prop-types'
import marked from 'marked'

import Avatar from 'material-ui/Avatar'
import { withStyles } from 'material-ui/styles'
import dateFormat from 'dateformat'
import { replyStyle } from './styles'


const Reply = ({ reply, classes }) => (
   (
    <div className={classes.root}>
      <div className={classes.left}>
        <Avatar src={reply.author.avatar_url} />
      </div>
      <div className={classes.right}>
        <span>{`${reply.author.loginname} ${dateFormat(reply.create_at, 'yy-mm-dd')}`}</span>
        <p dangerouslySetInnerHTML={{ __html: marked(reply.content) }} />
      </div>
    </div>
  )
);

Reply.PropTypes = {
  reply: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(replyStyle)(Reply)
