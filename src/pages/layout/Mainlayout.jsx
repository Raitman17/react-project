import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import { useNavigate, Outlet } from 'react-router-dom';
import './Mainlayout.css';
import { useAuth } from '../../auth/use-auth';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getProfileData } from '../../store/action/page-action';

function Header() {
    const {isAuth} = useAuth();
    const [buttons, setButtons] = useState({});
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate('/');
    };

    const goToServicePage = () => {
        navigate('/services');
    };

    const goToLoginPage = () => {
        navigate('/login');
    };

    const goToProfilePage = () => {
        navigate('/profile');
    }

    const loguot = () => {
        localStorage.removeItem('authToken');
        navigate('/');
        setUser(null)
    };

    const statePage = useSelector(state => state.page);

    useEffect(() => {
        let buttons = {};
        for (let [key, value] of Object.entries(statePage)) {
            buttons[key] = value ? "header-button-active" : "header-button";
        }
        setButtons(buttons);

        const token = localStorage.getItem('authToken')

        if (token) {
            getProfileData(token).then(res => setUser(res));
        }
    }, [statePage]);

    return (
        <>
            <header>
                <div>
                    <Button label="Главная" onClick={goToHomePage} size="s" className={buttons['main']} />
                    <Button label="Сервисы" onClick={goToServicePage} size="s" className={buttons['service']} />
                </div>
                <div className='header-right'>
                    {
                        user ? (
                            <div className={`${buttons['user']}-user`} onClick={goToProfilePage}>
                                <img src={user ? user.image : ''} alt='' className='user-image'/>
                                <Text size="s">{user ? user.username : "ФИО"}</Text>
                            </div>
                        ) : (
                            <div className={`${buttons['user']}-user`} onClick={goToProfilePage}>
                                <Text size="s">{user ? user.username : "ФИО"}</Text>
                            </div>
                        )
                    }
                    {
                        isAuth ? (
                            <Button label='Выйти' onClick={() => loguot()} size="s" className="header-button" />
                        ) : (
                            <Button label='Войти' onClick={goToLoginPage} size="s" className={buttons['login']} />
                        )
                    }
                </div>
            </header>

            <main>
                <Outlet />
            </main>
            
            <footer>
                <div>
                    <Button label="Главная" onClick={goToHomePage} size="s" className={buttons['main']} />
                    <Button label="Сервисы" onClick={goToServicePage} size="s" className={buttons['service']} />
                </div>
                <div>
                    <Text>ⓒ 2024 Моя компания</Text>
                </div>
            </footer>
        </>
    );
};

export default Header;
