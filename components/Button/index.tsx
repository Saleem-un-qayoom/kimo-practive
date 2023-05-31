import './index.scss';

interface PropType {
  children: JSX.Element | JSX.Element[] | string;
  variant?: 'button-primary' | 'button-secondary';
}

function Button({ children, variant = 'button-primary' }: PropType) {
  return <button className={`button ${variant}`}>{children}</button>;
}

export default Button;
