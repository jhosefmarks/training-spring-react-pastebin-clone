import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import validator from 'validator'

import SignInForm from '../components/forms/SignInForm'
import { isObjEmpty } from '../helpers/helpers'
import { loginUser } from '../actions/authActions'

export default function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loggedIn = useSelector(state => state.auth.loggedIn)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (loggedIn) {
      navigate('/')
    }
  })

  const login = ({ email, password }) => {
    const errors = {}
    setErrors(errors)

    if (!validator.isEmail(email)) {
      errors.email = 'O e-mail não é válido'
    }

    if (validator.isEmpty(password)) {
      errors.password = 'A senha não pode ser vazia'
    }

    if (!isObjEmpty(errors)) {
      setErrors(errors)
      return
    }

    dispatch(loginUser({ email, password }))
      .catch(err => { setErrors({ auth: 'Dados inválidos.' })})
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col sm="12" md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <Card body>
            { errors.auth && <Alert variant="danger">{ errors.auth }</Alert> }

            <h3>Iniciar sessão</h3><hr />

            <SignInForm errors={errors} onSubmitCallback={login}></SignInForm>

            <div className="mt-4">
              <Link to={"/signup"}>Não tem uma conta? Registrar-se aqui.</Link>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
