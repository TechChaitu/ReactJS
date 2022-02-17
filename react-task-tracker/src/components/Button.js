 const Button = ({color,text,onAdd}) => {
  return <button style={{backgroundColor:color}} onClick={onAdd} className='btn'>
      {text}
  </button>;
}
export default Button;
