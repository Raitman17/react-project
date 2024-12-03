import { useState, useEffect } from 'react';

import { Card } from '@consta/uikit/Card';
import { List } from '@consta/uikit/ListCanary';
import { Text } from '@consta/uikit/Text';
import { useDispatch } from "react-redux";

import './MainPage.css';
import { setPage } from '../../store/slices/pageSlice';
import { getMainList } from '../../store/action/page-action';


function MainPage() {
    const dispatch = useDispatch();
    const [cards, setCards] = useState([]);

    // useEffect(() => {
    //     fetch('https://673423afa042ab85d1190055.mockapi.io/api/v1/main')
    //         .then((response) => response.json())
    //         .then((data) => setCards(data))
    // }, []);

    useEffect(() => {
        const fetchdata = async() => {
            const result = await getMainList();
            dispatch(setPage({
                user: false,
                service: false,
                main: true,
                login: false
            }));
            setCards(result);
        }
        fetchdata();
    }, [dispatch]);


    return (
        <div className="card-container">
            <List
                items={cards}
                renderItem={(item) => (
                    <Card verticalSpace="m" horizontalSpace="m" className="card-style" id={item.id}>
                        <Text weight="bold" lineHeight="l" size="2xl">{item.name}</Text>
                        <Text>{item.description}</Text>
                        <Text align="right" view="ghost" size="s">{item.createdAt}</Text>
                    </Card>
                )}
            />
        </div>
    );
}

export default MainPage;