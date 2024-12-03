import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPage } from "../../store/slices/pageSlice";
import { useNavigate } from 'react-router-dom';
import './login.css';



function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        const fetchdata = async() => {
            dispatch(setPage({
                user: false,
                service: false,
                main: false,
                login: true
            }));
        }
        fetchdata();
    }, [dispatch]);

    const handleLogin = async() => {
        const expiresInMins = 4000;
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password, expiresInMins }),
        })

        if (!response.ok) {
            setError('Не удалось войти. Проверьте данные и попробуйте снова.')
            return;
        }

        const data = await response.json()

        localStorage.setItem('authToken', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)

        navigate('/')
    }

    return (
        <div className="formContainer">
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
            />
            <button onClick={handleLogin} className="login-button">
                войти
            </button>
            {error && <span className="error-message">{error}</span>}
        </div>
    )
}

export default LoginPage