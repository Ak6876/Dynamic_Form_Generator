
const Error = ({ message }: { message: string }) => {
  return (
    <div className="w-11/20 flex flex-col py-1 pr-1">
        <main className={` w-full h-full p-4 border-2 border-gray-400 rounded-md overflow-y-auto`}>
          <div className="flex flex-col items-center justify-center bg-red-700 rounded-lg px-4 py-2">
            <p className="text-white font-semibold">{message}</p>
          </div>
        </main>
    </div>
  )
}

export default Error