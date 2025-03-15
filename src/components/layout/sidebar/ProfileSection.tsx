import useAuth from '../../../hooks/useAuth';

const ProfileSection = () => {
  const { auth } = useAuth()

  const data = auth?.user
  const truncatedName = data && data?.username?.length > 3 && data?.username.slice(0, 2).toLocaleUpperCase();

  return (
    <div className="max-w-full p-2  flex justify-between gap-1 items-end flex-col">
      <div className="w-full flex justify-start items-center md:flex-row flex-col gap-3" >
        {
          !data?.profileImage ? <div className="w-15 h-15 bg-slate-300 rounded-full text-white border-slate-500 flex justify-center items-center text-2xl">
            {truncatedName}
          </div> :
            <>
              <img src={data?.profileImage} alt="profile" height={50} width={50} className="" style={{ borderRadius: "50%" }} />
            </>
        }
        <h2 className="text-lg font-bold"> {data?.username ?? ""}</h2>
      </div>

    </div>
  )
}

export default ProfileSection