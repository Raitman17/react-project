import { useState, useEffect } from 'react';
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
import { useDispatch } from "react-redux";
import { useAuth } from '../../auth/use-auth';
import { useNavigate } from 'react-router-dom';
import './ServicePage.css';
import { setPage } from '../../store/slices/pageSlice';
import { getServiceList } from '../../store/action/page-action';

function ServicePage() {
    const {isAuth} = useAuth();
    const dispatch = useDispatch();
    const [cards, setCards] = useState([]);
    const navigate = useNavigate();

    const goToServiceDetail = (id) => () => {
        navigate(`/services/${id}`);
    };

    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
            return;
        }
        const fetchdata = async() => {
            dispatch(setPage({
                user: false,
                service: true,
                main: false,
                login: false
            }));
            const result = await getServiceList();
            setCards(result);
        }
        fetchdata();
    }, [dispatch, navigate, isAuth]);
    
    // console.log('authToken')
    // console.log(localStorage.getItem('authToken'))
    // console.log('refreshToken')
    // console.log(localStorage.getItem('refreshToken'))

    return (
        <div className="card-grid">
                {cards &&
                cards.map(({id, name, description, createdAt}) => (
                    <Card key={id} verticalSpace="m" horizontalSpace="m" className="card-style" onClick={goToServiceDetail(id)}>
                        <div className="card-content">
                            <Text weight="bold" lineHeight="l" size="2xl">{name}</Text>
                            <Text>{description}</Text>
                            <Text align="right" view="ghost" size="s" className="card-footer">{createdAt}</Text>
                        </div>
                    </Card>
                ))}
        </div>
    );
};

export default ServicePage;
