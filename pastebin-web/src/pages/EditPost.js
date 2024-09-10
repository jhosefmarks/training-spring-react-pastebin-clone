import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Row, Col, Card, Alert } from 'react-bootstrap'
import { toast } from 'react-toastify'
import axios from 'axios'
import validator from 'validator'

import NewPostForm from '../components/forms/NewPostForm'
import { POST_DETAILS_ENDPOINT, UPDATE_POST_ENDPOINT } from '../helpers/endpoints'
import { isObjEmpty } from '../helpers/helpers'
import { exposures } from '../helpers/exposures'
import { getUserPosts } from '../actions/postActions'

export default function EditPost() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const [ post, setPost ] = useState(null)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    axios.get(`${POST_DETAILS_ENDPOINT}/${id}`).then(response => {
      setPost(response.data)
    }).catch(e => {
      navigate(`/`)
    })
}, [id, navigate])

  const editPost = async ({ title, content, expirationTime, exposureId }) => {
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
      const response = await axios.put(`${UPDATE_POST_ENDPOINT}/${post.postId}`, { title, content, expirationTime, exposureId })

      await dispatch(getUserPosts())

      toast.info('O post foi atualizado com sucesso', {
        position: 'bottom-center',
        theme: 'dark',
        autoClose: 2000
      })

      navigate(`/post/${response.data.postId}`)
    } catch(err) {
      setErrors({ editpost: err.response.data.message })
    }
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col sm="12" md={{ span: 8, offset: 2 }} lg={{ span: 10, offset: 1 }}>
          <Card body>
            { errors.newpost && <Alert variant="danger">{ errors.auth }</Alert> }

            <h3>Editar post</h3><hr />

            { post && <NewPostForm
              errors={errors}
              onSubmitCallback={editPost}
              pTitle={post.title}
              pContent={post.content}
              pExposureId={post.exposure.id}
              textButton="Editar Post"
            /> }
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
