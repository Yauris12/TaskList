import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import '../Login/Login.css'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Switch, FormControlLabel } from '@mui/material'

const { REACT_APP_API_ENDPOINT } = process.env
const Register = () => {
  const [data, setData] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}auth/data`)
      .then((response) => response.json())
      .then((data) => setData(data.result))
  }, [])
  const initialValues = {
    userName: '',
    password: '',
    email: '',
    teamId: '',
    role: '',
    continent: '',
    region: '',
    switch: false,
  }

  const required = '* Campo obligatorio'
  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(4, 'la cantidad minima de caracteres es 4')
      .required(required),
    password: Yup.string().required(required),
    email: Yup.string().email('Debe ser un email valido').required(required),
    role: Yup.string().required(required),
    continent: Yup.string().required(required),
    region: Yup.string().required(required),
  })

  const handleChangeContinent = (value) => {
    formik.setFieldValue('continent', value)
    if (value !== 'America') formik.setFieldValue('region', 'Otro')
  }
  const onSubmit = (e) => {
    const teamId = !values.teamId ? uuidv4() : values.teamId

    fetch(`${REACT_APP_API_ENDPOINT}auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          userName: values.userName,
          password: values.password,
          email: values.email,
          teamID: teamId,
          role: values.role,
          continent: values.continent,
          region: values.region,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) =>
        navigate('/registered/' + data.result?.user?.teamID, { replace: true })
      )
  }
  const formik = useFormik({ initialValues, onSubmit, validationSchema })
  const { handleSubmit, handleChange, values, touched, handleBlur, errors } =
    formik

  return (
    <div className='auth'>
      <form onSubmit={handleSubmit}>
        <h1>Registro</h1>

        <div>
          <label>Nombre de usuario</label>
          <input
            type='text'
            name='userName'
            value={values.userName}
            onChange={handleChange}
            className={errors.userName && touched.userName ? 'error' : ''}
          />
          {errors.userName && touched.userName && (
            <span className='error-message'>{errors.userName}</span>
          )}
        </div>

        <div>
          <label>Email</label>
          <input
            type='email'
            name='email'
            value={values.email}
            onChange={handleChange}
            className={errors.email && touched.email ? 'error' : ''}
          />
          {errors.email && touched.email && (
            <span className='error-message'>{errors.email}</span>
          )}
        </div>

        <div>
          <label>Contraseña</label>
          <input
            type='password'
            name='password'
            value={values.password}
            onChange={handleChange}
            className={errors.password && touched.password ? 'error' : ''}
          />
          {errors.password && touched.password && (
            <span className='error-message'>{errors.password}</span>
          )}
        </div>

        <FormControlLabel
          control={
            <Switch
              value={values.switch}
              onChange={() =>
                formik.setFieldValue('switch', !formik.values.switch)
              }
              name='switch'
              color='secondary'
            />
          }
          label='Perteneces aun equipo ya creado'
        />
        {values.switch && (
          <div>
            <label>Por favor introduce el identificador de equipo</label>
            <input
              type='text'
              name='teamId'
              value={values.teamId}
              onChange={handleChange}
            />
          </div>
        )}

        <div>
          <label>Rol</label>
          <select
            name='role'
            value={values.role}
            onChange={handleChange}
            className={errors.role && touched.role ? 'error' : ''}
          >
            <option value=''>Selecion rol ...</option>
            {data?.Rol.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.role && touched.role && (
            <span className='error-message'>{errors.role}</span>
          )}{' '}
        </div>

        <div>
          <label>Continente</label>
          <select
            name='continent'
            value={values.continent}
            onChange={(e) => handleChangeContinent(e.currentTarget.value)}
            className={errors.continent && touched.continent ? 'error' : ''}
          >
            <option value=''>Seleciona continente ...</option>
            {data?.continente.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.continent && touched.continent && (
            <span className='error-message'>{errors.continent}</span>
          )}{' '}
        </div>
        {values.continent === 'America' && (
          <div>
            <label>Region</label>
            <select
              name='region'
              value={values.region}
              onChange={handleChange}
              className={errors.region && touched.region ? 'error' : ''}
            >
              <option value=''>Selecion region ...</option>

              {data?.region.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.region && touched.region && (
              <span className='error-message'>{errors.region}</span>
            )}{' '}
          </div>
        )}

        <div>
          <button type='submit'>Enviar</button>
        </div>
        <div>
          <Link to='/login'>Login</Link>
        </div>
      </form>
    </div>
  )
}

export default Register
