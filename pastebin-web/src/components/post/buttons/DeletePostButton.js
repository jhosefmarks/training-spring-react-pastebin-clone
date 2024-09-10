import React from 'react'
import { useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button'
import { confirmAlert } from 'react-confirm-alert'
import { toast } from 'react-toastify'
import axios from 'axios'

import { DELETE_POST_ENDPOINT } from '../../../helpers/endpoints'
import { getUserPosts } from '../../../actions/postActions'

export default function DeletePostButton({ postId, title }) {
  const dispatch = useDispatch()

  const createAlert = () => {
    confirmAlert({
      title: 'Excluir Post',
      message: `Tem certeza que deseja excluir o post "${title}"`,
      buttons: [
        {
          label: 'Sim',
          onClick: () => { deletePost() }
        },
        {
          label: 'Não',
          onClick: () => { return false }
        }
      ]
    })
  }

  const deletePost = async () => {
    try {
      await axios.delete(`${DELETE_POST_ENDPOINT}/${postId}`)

      await dispatch(getUserPosts())

      toast.info('O post foi excluído', {
        position: 'bottom-center', autoClose: 2000, theme: 'dark' })

    } catch(err) {
      toast.error(err.response.data.message, {
        position: 'bottom-center', autoClose: 2000, theme: 'dark' })
    }
  }

  return (
    <Button
      onClick={ createAlert }
      variant="danger"
      size="sm">Excluir</Button>
  )
}
