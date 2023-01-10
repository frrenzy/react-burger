import { useState, ChangeEventHandler } from 'react'

const useForm = <T extends {}>(initialValues: T) => {
  const [form, setForm] = useState<T>(initialValues ?? ({} as T))

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault()
    const { name, value } = e.target
    setForm({ ...form, [name]: value } as T)
  }

  return { form, handleChange, setForm }
}

export default useForm
