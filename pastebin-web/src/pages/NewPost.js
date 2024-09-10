import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Alert } from 'react-bootstrap'
import { toast } from 'react-toastify'
import validator from 'validator'
import axios from 'axios'

import NewPostForm from '../components/forms/NewPostForm'
import { isObjEmpty } from '../helpers/helpers'
import { exposures } from '../helpers/exposures'
import { CREATE_POST_ENDPOINT } from '../helpers/endpoints'
import { getUserPosts } from '../actions/postActions'

export default function NewPost() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})

  const createPost = async ({ title, content, expirationTime, exposureId }) => {
    const errors = {}
    setErrors(errors)

    if (validator.isEmpty(title)) {
      errors.title = 'O título é obrigatório'
    }

    if (validator.isEmpty(content)) {
      errors.content = 'O conteúdo é obrigatório'
    }

    if (!isObjEmpty(errors)) {
      setErrors(errors)
      return
    }

    expirationTime = parseInt(exposureId) === exposures.PRIVATE ? 0 : expirationTime

    try {
      const response = await axios.post(CREATE_POST_ENDPOINT, { title, content, expirationTime, exposureId })

      await dispatch(getUserPosts())

      toast.info('O post foi criado com sucesso', {
        position: 'bottom-center',
        theme: 'dark',
        autoClose: 2000
      })

      navigate(`/post/${response.data.postId}`)
    } catch(err) {
      setErrors({ newpost: err.response.data.message })
    }
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col sm="12" md={{ span: 8, offset: 2 }} lg={{ span: 10, offset: 1 }}>
          <Card body>
            { errors.newpost && <Alert variant="danger">{ errors.auth }</Alert> }

            <h3>Criar post</h3><hr />

            <NewPostForm errors={errors} onSubmitCallback={createPost} />
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
