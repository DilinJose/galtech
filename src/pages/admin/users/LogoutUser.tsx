import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import useAuth from '../../../hooks/useAuth'

const LogoutUser = () => {
    const navigate = useNavigate()
    const { setAuth } = useAuth()
    useEffect(() => {
        (() => {
            setAuth(null)
            localStorage.clear()
            navigate("/")
        })()
    }, [setAuth, navigate])

    return null
}

export default LogoutUser