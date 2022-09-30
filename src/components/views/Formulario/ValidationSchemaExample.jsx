import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
const validationMessages = {
  fullname: {
    required: 'El campo fullname es obligatorio',
    fieldLength: 'El campo nombre debe tener entre 4 y 50 caracteres',
    format: 'El campo nombre solo puede contener letras',
  },
  age: {
    required: 'El campo age es obligatorio',
    numbers: 'El campo edad solo puede contener numeros',
    fieldLength: 'El campo edad debe tener un valor entre 18 y 99',
  },
  email: {
    required: 'El campo email es obligatorio',
    format: 'El campo email debe tener un formato válido',
  },
}

const SignupSchema = Yup.object().shape({
  // COMPLETAR VALIDACIONES
  fullname: Yup.string(validationMessages.fullname.format)
    .min(4, validationMessages.fullname.fieldLength)
    .max(50, validationMessages.fullname.fieldLength)
    .required(validationMessages.fullname.required),
  age: Yup.number()
    .typeError(validationMessages.age.numbers)
    .min(18, validationMessages.age.fieldLength)
    .max(99, validationMessages.age.fieldLength)
    .required(validationMessages.age.required),
  email: Yup.string()
    .email(validationMessages.email.format)
    .required(validationMessages.email.required),
})

const ValidationSchemaExample = () => {
  return (
    <div>
      <h1>Signup</h1>

      {/* CONFIGURAR VALIDACIONES */}
      <Formik
        initialValues={{
          fullname: '',
          age: '',
          email: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values)
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name='fullname' />
            {errors.fullname && touched.fullname ? (
              <div>{errors.fullname}</div>
            ) : null}
            <Field name='age' />
            {errors.age && touched.age ? <div>{errors.age}</div> : null}
            <Field name='email' type='email' />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <button type='submit'>Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export { ValidationSchemaExample, validationMessages }
