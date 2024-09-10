import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import moment from 'moment'

import DeletePostButton from './buttons/DeletePostButton'
import { exposures } from '../../helpers/exposures'

export default function Post({ post, renderControls }) {
  return (
    <Card className="mb-4">
      { renderControls &&
      <Card.Header className="d-flex justify-content-between">
        <div>
          <Badge pill bg={ post.exposure.id === exposures.PUBLIC ? 'success' : 'secondary' } className="me-2">
            { post.exposure.type }
          </Badge>
          { post.expired && post.exposure.id === exposures.PUBLIC && <Badge pill bg="danger" className="me-2">Expirado</Badge> }
        </div>
        <div>
          <Button variant="primary" size="sm" className="me-2"
            as={NavLink} to={`/editpost/${post.postId}`}
          >Editar</Button>
          <DeletePostButton postId={post.postId} title={post.title}></DeletePostButton>
        </div>
      </Card.Header> }
      <Card.Body>
        <Card.Title>
          <Link to={`/post/${post.postId}`}>{ post.title }</Link>
        </Card.Title>
        <Card.Text>
          Criado por { post.user.firstName }, { moment(post.createdAt).fromNow() }
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
