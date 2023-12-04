import { useState } from 'react';
import styles from './Signup.module.css';
import { useSignup } from '../../hooks/useSignup';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  //미리 만든 가입하기훅으로 가입하기 함수와 에러, 로딩상태를 가져옴
  const { signup, error, isPending } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, name);
  };

  return (
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
      <h2>Signup</h2>
      <label>
        <span>email:</span>
        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
      </label>
      <label>
        <span>password:</span>
        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
      </label>
      <label>
        <span>name:</span>
        <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
      </label>

      {!isPending && <button className="btn">가입하기</button>}
      {isPending && (
        <button className="btn" disabled>
          가입중...
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
}
