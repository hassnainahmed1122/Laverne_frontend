export const Header = () => {
    return (
        <div className="w-full h-[14vh] bg-white shadow-md px-4">
        <div className="flex items-center justify-end h-full space-x-4 font-dinnextltarabic p-10">
          <div className="flex flex-col items-start space-x-3">
            <img
              src="https://cdn.salla.sa/XzOPD/EJ37QZ2evPx7y7561LXSZknDyIn19pZFzaaZ5LXh.jpg"
              alt="logo"
              className="w-auto h-10 md:h-12 lg:h-14"
            />
            <div className="ml-4 text-md text-[#636362] font-semibold tracking-normal">
              Laverne Product Return Platform
            </div>
          </div>
        </div>
      </div>
    )
}