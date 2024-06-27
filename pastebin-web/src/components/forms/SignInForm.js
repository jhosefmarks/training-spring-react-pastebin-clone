import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

export default function SignInForm({ errors, onSubmitCallback }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitForm = e => {
    e.preventDefault()

    onSubmitCallback({ email, password })
  }

  return (
    <Form onSubmit={submitForm}>
      <Form.Group control="email" className="mb-3">
        <Form.Label>E-mail</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={ e => setEmail(e.target.value) }
          placeholder="E-mail"
          isInvalid={errors.email}
        />
        <Form.Control.Feedback type="invalid">
          { errors.email }
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group control="password" className="mb-3">
        <Form.Label>Senha</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={ e => setPassword(e.target.value) }
          placeholder="Senha"
          isInvalid={errors.password}
        />
        <Form.Control.Feedback type="invalid">
          { errors.password }
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Button variant="primary" type="submit">Iniciar sessão</Button>
      </Form.Group>
    </Form>
  )
}
