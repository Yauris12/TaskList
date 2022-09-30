import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env

const TaskForm = () => {
  const initialValues = {
    title: '',
    status: '',
    importance: '',
    description: '',
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(6, 'la cantida minima de caracteres de 6')
      .required('por favor colocar titulo'),
    status: Yup.string().required('requerido'),
    importance: Yup.string().required('requerido'),
    description: Yup.string().required('requerido'),
  })

  const onSubmit = (e) => {
    fetch(`${API_ENDPOINT}task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({
        task: values,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        toast('Tu tarea se creo')
        resetForm()
      })
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  const {
    handleSubmit,
    handleChange,
    errors,
    touched,
    handleBlur,
    values,
    resetForm,
  } = formik
  return (
    <section className='task-form'>
      <h2>Crear tarea</h2>
      <p>Crea tus tareas</p>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <input
              name='title'
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='titulo'
              className={errors.title && touched.title ? 'error' : ''}
              value={values.title}
            />
            {errors.title && touched.title && (
              <span className='error-message'>{errors.title}</span>
            )}
          </div>

          <div>
            <select
              name='status'
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.status && touched.status ? 'error' : ''}
              value={values.status}
            >
              <option value=''>Seleccionar un estado</option>
              <option value='NEW'>Nueva</option>
              <option value='IN PROGRESS'>En proceso</option>
              <option value='FINISHED'>Terminado</option>
            </select>
            {errors.status && touched.status && (
              <span className='error-message'>{errors.status}</span>
            )}
          </div>

          <div>
            <select
              name='importance'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.importance}
              className={errors.importance && touched.importance ? 'error' : ''}
            >
              <option value=''>Seleccione una prioridad</option>

              <option value='LOW'>Baja</option>
              <option value='MEDIUM'>Media</option>
              <option value='HIGH'>Alta</option>
            </select>
            {errors.importance && touched.importance && (
              <span className='error-message'>{errors.importance}</span>
            )}
          </div>

          <div>
            <textarea
              name='description'
              onChange={handleChange}
              placeholder='Descripcion'
              onBlur={handleBlur}
              value={values.description}
              className={
                errors.description && touched.description ? 'error' : ''
              }
            />
            {errors.description && touched.description && (
              <span className='error-message'>{errors.description}</span>
            )}
          </div>
        </div>
        <button type='submit'>Crear</button>
      </form>
      <ToastContainer />
    </section>
  )
}

export default TaskForm
