import {useSelector} from 'react-redux'

export function useAuth() {
    // const {email, token, id} = useSelector(state => state.user);
    const token = localStorage.getItem('authToken')

    return {
        isAuth: !!token,
    };
}