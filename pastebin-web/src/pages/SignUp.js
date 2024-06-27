import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import validator from 'validator'

import SignUpForm from '../components/forms/SignUpForm'
import { isObjEmpty } from '../helpers/helpers'
import { registerUser, loginUser } from '../actions/authActions'

export default function SignUp() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loggedIn = useSelector(state => state.auth.loggedIn)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (loggedIn) {
      navigate('/')
    }
  })

  const register = ({ email, password, firstName, lastName }) => {
    const errors = {}
    setErrors(errors)

    if (!validator.isEmail(email)) {
      errors.email = 'O e-mail não é válido'
    }

    if (!validator.isLength(password, { min: 8, max: 30 })) {
      errors.password = 'A senha deve ter entre 8 e 30 caracteres'
    }

    if (validator.isEmpty(firstName)) {
      errors.firstName = 'Nome é obrigatório'
    }

    if (validator.isEmpty(lastName)) {
      errors.lastName = 'Sobrenome é obrigatório'
    }

    if (!isObjEmpty(errors)) {
      setErrors(errors)
      return
    }

    dispatch(registerUser({ email, password, firstName, lastName }))
      .then(response => {
        dispatch(loginUser({ email, password }))
      })
      .catch(err => {
        setErrors({ registerError: err.response.data.message })
      })
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col sm="12" md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
          <Card body>
            { errors.registerError && <Alert variant="danger">{ errors.registerError }</Alert> }

            <h3>Criar conta</h3><hr />

            <SignUpForm errors={errors} onSubmitCallback={register}></SignUpForm>

            <div className="mt-4">
              <Link to={"/signin"}>Já tem uma conta? Iniciar sessão aqui.</Link>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
