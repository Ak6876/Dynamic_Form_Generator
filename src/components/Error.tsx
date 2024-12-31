
interface ErrorProps {
  type: string;
  message: string;
  path?: string[] | string | null;
}

const Error = ( ErrorLogs : ErrorProps) => {
  return (
    <div className="w-11/20 flex flex-col py-1 pr-1">
        <main className={` w-full h-full p-4 border-2 border-gray-400 rounded-md overflow-y-auto`}>
          <div className="flex flex-col gap-2 bg-red-700 rounded-lg px-4 py-2">
            <p className="text-white font-semibold">{ErrorLogs.type}</p>
            <p className="text-white font-semibold">Message: {ErrorLogs.message}</p>
            {typeof ErrorLogs.path === "string" && <p className="text-white font-semibold">Path: {ErrorLogs.path} </p>}
            <div className="flex flex-row gap-1">
            {Array.isArray(ErrorLogs.path) && 
              ErrorLogs.path.map((path, index) => {
              return path !== null && ( index === 0 ? <span key={index} className="text-white font-semibold">path: {path}</span> :
                  index === 1 ? (<span key={index} className="text-white font-semibold ">at {path} index</span>) : index === 2 && <span key={index} className="text-white font-semibold">of type "{path}"</span>)
              })
            }
            </div>
            {/* { message &&
              message.map((msg, index) => (
                <p key={index} className="text-white font-semibold">{msg}</p>
              ))
            } */}
          </div>
        </main>
    </div>
  )
}

export default Error