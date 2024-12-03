import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
import './ServiceDetailPage.css'

import { getServiceDetail } from '../../store/action/page-action';

function ServiceDetailPage() {
    const params = useParams();
    const serviceId = params.id;

    const [service, setService] = useState(null);

    useEffect(() => {
        const fetchdata = async() => {
            const result = await getServiceDetail(serviceId);
            setService(result);
        }
        fetchdata();
    }, [serviceId]);

    return (
        <div>
            {service ? (
                <Card verticalSpace="m" horizontalSpace="m" className="card-style-detail">
                    <div className="card-content">
                        <img src={service.image} alt=''/>
                        <Text weight="bold" lineHeight="l" size="2xl">{service.name}</Text>
                        <Text>Описание: {service.description}</Text>
                    </div>
                 </Card>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ServiceDetailPage;