import React from 'react'
import Placeholder from 'react-bootstrap/Placeholder'
import Card from 'react-bootstrap/Card'

export default function PostPlaceholder() {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={4} size="lg" />
        </Placeholder>

        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={6} />{' '}
          <Placeholder xs={5} />
          <Placeholder xs={5} />{' '}
          <Placeholder xs={5} />
          <Placeholder xs={6} />{' '}
          <Placeholder xs={5} />
          <Placeholder xs={5} />{' '}
          <Placeholder xs={6} />
        </Placeholder>
      </Card.Body>
    </Card>
  )
}
