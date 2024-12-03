

export const getMainList = async() => {
    const response = await fetch('https://673423afa042ab85d1190055.mockapi.io/api/v1/main', {
        method: 'GET',
    });
    return await response.json();
}

export const getServiceList = async() => {
    const response = await fetch('https://673423afa042ab85d1190055.mockapi.io/api/v1/services', {
        method: 'GET',
    });
    return await response.json();
}

export const getServiceDetail = async(serviceId) => {
    const response = await fetch(`https://673423afa042ab85d1190055.mockapi.io/api/v1/services/${serviceId}`, {
        method: 'GET',
    });
    return await response.json();
}

export const getProfileData = async(token) => {
    let response = await fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const refreshToken = localStorage.getItem('refreshToken')
        const expiresInMins = 4000

        const refreshRespone = await fetch(`https://dummyjson.com/auth/refresh`, {
            method: 'POST',
            body: JSON.stringify({ refreshToken, expiresInMins }),
        });

        if (!refreshRespone.ok) {
            return null;
        }

        const data = await refreshRespone.json()

        localStorage.setItem('authToken', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)

        response = await fetch(`https://dummyjson.com/auth/me}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            return null;
        }
    }

    return await response.json();
}