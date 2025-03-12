import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import useAuth from '../../hooks/useAuth'

const Logout = () => {
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

export default Logout