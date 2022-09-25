import classes from './Input.module.css';
const Input = ({ id, isValid, label, type, onChange, onBlur, ...props }) => {
  return (
    
    <div
    className={`${classes.control} ${
      isValid === false ? classes.invalid : ""
    }`}
  >
    <label htmlFor={id}>{label}</label>
    <input id={id} type={type} onChange={onChange} onBlur={onBlur} {...props} />
  </div>
  );
};
export default Input;
