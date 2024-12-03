import { useAuth } from '../../auth/use-auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfileData } from '../../store/action/page-action';
import { useDispatch } from "react-redux";
import { setPage } from '../../store/slices/pageSlice';
import './ProfilePage.css'
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';

function ProfilePage() {
    const {isAuth} = useAuth();
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const token = localStorage.getItem('authToken');

    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
            return;
        }
        const fetchdata = async() => {
            const result = await getProfileData(token);
            setData(result);
        }
        fetchdata();
        dispatch(setPage({
            user: true,
            service: false,
            main: false,
            login: false
        }));
    }, [token, navigate, isAuth, dispatch]);

    return (
        <>
            {data ? (
                <Card verticalSpace="m" horizontalSpace="m" className="card-style-profile">
                    <div className="card-content-profile">
                        <div className='profile-description'>
                            <Text weight="bold" lineHeight="l" size="2xl">Информация</Text>
                            <Text>email: {data.email}</Text>
                            <Text>Имя: {data.firstName}</Text>
                            <Text>Фамилия: {data.lastName}</Text>
                            <Text>Дата рождения: {data.birthDate}</Text>
                            <Text>Номер: {data.phone}</Text>
                        </div>
                        <div className='profile-description'>
                            <Text weight="bold" lineHeight="l" size="2xl">Адрес</Text>
                            <Text>Адрес: {data.address.address}</Text>
                            <Text>Город: {data.address.city}</Text>
                            <Text>Страна: {data.address.country}</Text>
                        </div>
                    </div>
                    <div className="card-content-profile">
                        <img src={data.image} alt="" className='photo-user'/>
                    </div>
                </Card>
            ): (
                <p>Loading...</p>
            )}
        </>
    )
}

export default ProfilePage