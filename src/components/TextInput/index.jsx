import './styles.css'

export const TextInput = ({searchValue, handleChange}) => {
  return (
    <input placeholder='Busque aqui' className='text-input' type="search" onChange={handleChange} value={searchValue}/>
  )
}
