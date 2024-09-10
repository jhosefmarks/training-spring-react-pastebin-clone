import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

import { exposures } from '../../helpers/exposures'

export default function NewPostForm({ errors, onSubmitCallback, pTitle = '', pContent = '', pExposureId = exposures.PUBLIC, pExpirationTime = 60, textButton = 'Criar Post' }) {
  const [title, setTitle] = useState(pTitle)
  const [content, setContent] = useState(pContent)
  const [expirationTime, setExpirationTime] = useState(pExpirationTime)
  const [exposureId, setExposureId] = useState(pExposureId)

  const submitForm = (e) => {
    e.preventDefault()
    onSubmitCallback({ title, content, expirationTime, exposureId })
  }

  return (
    <Form onSubmit={submitForm}>
      <Form.Group control="title" className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={ e => setTitle(e.target.value) }
          placeholder="ex. Snippet para percorrer um array"
          isInvalid={errors.title}
        />
        <Form.Control.Feedback type="invalid">
          { errors.title }
        </Form.Control.Feedback>
      </Form.Group>

      <Row className="mb-3">
        <Col md="6" xs="12">
          <Form.Group controlId="expirationTime">
            <Form.Label>Tempo de expiração</Form.Label>
            <Form.Control
              disabled={ parseInt(exposureId) === exposures.PRIVATE }
              as="select" value={expirationTime}
              onChange={ e => setExpirationTime(e.target.value) }
            >
              <option value="30">30 minutos</option>
              <option value="60">1 hora</option>
              <option value="120">2 horas</option>
              <option value="360">6 horas</option>
              <option value="720">12 horas</option>
              <option value="1440">1 dia</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              { errors.expirationTime }
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md="6" xs="12">
          <Form.Group controlId="exposureId">
            <Form.Label>Tipo de post</Form.Label>
            <div>
              <Form.Check
                onChange={ e => setExposureId(e.target.value) }
                checked={ parseInt(exposureId) === exposures.PRIVATE }
                value={exposures.PRIVATE}
                inline
                label="Privado"
                name="exposureId"
                type="radio"
              ></Form.Check>

              <Form.Check
                onChange={ e => setExposureId(e.target.value) }
                checked={ parseInt(exposureId) === exposures.PUBLIC }
                value={exposures.PUBLIC}
                inline
                label="Público"
                name="exposureId"
                type="radio"
              ></Form.Check>
            </div>
            <Form.Control.Feedback type="invalid">
              { errors.expirationTime }
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group control="content" className="mb-3">
        <Form.Label>Conteúdo</Form.Label>
        <Form.Control
          as="textarea"
          rows={10}
          value={content}
          onChange={ e => setContent(e.target.value) }
          isInvalid={errors.content}
        />
        <Form.Control.Feedback type="invalid">
          { errors.content }
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">{ textButton }</Button>
    </Form>
  )

}
