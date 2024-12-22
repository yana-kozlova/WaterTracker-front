import { NavLink, useLocation } from 'react-router-dom';
import Icon from '../Svg/Svg.jsx';
import css from './UserAuth.module.css';

function UserAuth() {
  const { pathname } = useLocation();

  return (<div className={css.flexContainer}>
      <NavLink
        className={css.signUpLink}
        to={pathname === '/signin' ? '/signup' : '/signin'}
      >
        {pathname === '/signin' ? 'Sign Up' : 'Sign In'}
      </NavLink>
    <Icon
      name="useroutline"
      size="100%"
      color="#9ebbff"
      className={css.iconUser}
    />
    </div>);
}

export default UserAuth;
