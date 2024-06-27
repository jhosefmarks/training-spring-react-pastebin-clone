import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

export default function SignUpForm({ errors, onSubmitCallback }) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    onSubmitCallback({ email, password, firstName, lastName });
  }

  return (
    <Form onSubmit={submitForm}>
      <Row>
        <Form.Group control="firstName" as={Col} className="mb-3" md={6}>
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={ e => setFirstName(e.target.value) }
            placeholder="Nome"
            isInvalid={errors.firstName}
          />
          <Form.Control.Feedback type="invalid">
            { errors.firstName }
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group control="lastName" as={Col} className="mb-3" md={6}>
          <Form.Label>Sobrenome</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={ e => setLastName(e.target.value) }
            placeholder="Sobrenome"
            isInvalid={errors.lastName}
          />
          <Form.Control.Feedback type="invalid">
            { errors.lastName }
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

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

      <Button variant="primary" type="submit">Criar conta</Button>
    </Form>
  )
}
