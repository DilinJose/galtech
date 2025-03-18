import { useNavigate } from 'react-router'
import Body from '../../../components/layout/body/Body'
import { ROUTERS } from '../../../utils/common/routes'

const AdminDashboard = () => {
  const navigate = useNavigate()
  return (
    <Body>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        onClick={() => navigate(ROUTERS.UserCreate)}
      >
        Create user
      </button>
    </Body>
  )
}

export default AdminDashboard