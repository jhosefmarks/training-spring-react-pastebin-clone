import React, { useState, useEffect }  from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Prism as SystaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { toast } from 'react-toastify'
import axios from 'axios'
import moment from 'moment'

import { POST_DETAILS_ENDPOINT } from '../helpers/endpoints'
import { downloadTextAsFile } from '../helpers/helpers'

export default function PostDetails() {
  const { id } = useParams()
  const [ post, setPost ] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${POST_DETAILS_ENDPOINT}/${id}`).then(response => {
      setPost(response.data)
    }).catch(e => {
      navigate('/')
    })
  }, [id, navigate])

  return (
    <div className="pb-4">
      { post && (
        <>
        <Alert variant="secondary" className="mt-5">
          <h1>{ post.title } </h1>
          <p>Criado por { post.user.firstName }, { moment(post.createdAt).fromNow() }</p>
        </Alert>

        <Card>
          <Card.Header className="text-end">
            <Button
              variant="primary"
              className="me-2"
              size="sm"
              onClick={() => {
                downloadTextAsFile(post.postId, post.content)
              }}>Download</Button>
            <CopyToClipboard
              onCopy={() => {
                toast.info('Copiado para área de transferência', {
                  position: 'bottom-center',
                  theme: 'dark',
                  autoClose: 2000
                })
              }}
              text={post.content}
            >
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                }}>Copiar para área de transferência</Button>
            </CopyToClipboard>
          </Card.Header>
          <Card.Body>
            <SystaxHighlighter language="javascript" showLineNumbers={true} style={vscDarkPlus}>
              { post.content }
            </SystaxHighlighter>
          </Card.Body>
        </Card>
      </>
      )}
    </div>
  )
}
