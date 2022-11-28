import { useState } from 'react'

const useForm = inputValues => {
  const [form, setForm] = useState(inputValues)

  const handleChange = event => {
    event.preventDefault()
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  return { form, handleChange, setForm }
}

export default useForm
