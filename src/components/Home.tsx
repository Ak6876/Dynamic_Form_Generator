import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/Editor');
    }
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full ">
        <div className="flex flex-col items-center justify-center">
            <div className="w-96 h-32">
            <img
                src="logo.png"
                alt="logo"
                className="object-contain"
            />
            </div>
            <div className="flex items-center justify-center w-2/3 mt-4">
                <p className="text-center">JForm is an powerful tool designed to seamlessly transform your JSON input into fully functional HTML forms in real-time. Whether you're a developer looking to save time or someone new to form creation, JForm simplifies the process, providing you with dynamic, error-proof forms that are ready to use instantly.</p>
            </div>
            <button className="bg-violet-600 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleClick} >Get Started</button>
        </div>
    </div>
  )
}

export default Home