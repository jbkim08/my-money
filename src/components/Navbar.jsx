import { Link } from 'react-router-dom';
//CSS모듈을 사용하면 css클래스가 다른 컴포넌트에도 적용되는것을 방지
import styles from './Navbar.module.css';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>myMoney</li>

        {!user && (
          <>
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li>
              <Link to="/signup">가입</Link>
            </li>
          </>
        )}

        {user && (
          <>
            <li>안녕하세요, {user.displayName}</li>
            <li>
              <button className="btn" onClick={logout}>
                로그아웃
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
