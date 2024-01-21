export default function Projects() {
    return (
        <section id="projects" className="p-3 text-center mt-32 max-w-5xl mx-auto">
        <p className="text-5xl lg:text-6xl text-gray-900 mb-10 font-bold">Projects</p>
        <div className="mt-20 rounded-xl overflow-hidden">
          <div className="group bg-black bg-opacity-75 lg:bg-opacity-50 hover:bg-opacity-75 transition-all py-8 lg:py-16 duration-500 flex items-center justify-center w-full h-full">
            <div className="space-y-10 mx-10 text-white transition-all duration-500">
              <p className="text-5xl font-bold">Mega Project</p>
              <p className="text-lg">A blogging web application where you can post your memories, stories, project with pictures. View, give love, comment and also you can share it.</p>
              <a href="#" className="block transition-all lg:opacity-0 group-hover:opacity-100 py-2 px-4 mx-auto max-w-md bg-purple-800 hover:bg-pink-800 rounded-xl">Visit Now</a>
            </div>
          </div>
        </div>
        <div className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 justify-items-center group">
          <div className="h-48 w-48 rounded-lg bg-gradient-to-tr from-gray-400 via-gray-400"></div>
          <div className="h-48 w-48 rounded-lg bg-gradient-to-tr from-gray-400 via-gray-400"></div>
          <div className="h-48 w-48 rounded-lg bg-gradient-to-tr from-gray-400 via-gray-400"></div>
          <a href="#" className="h-48 w-48 rounded-lg bg-gradient-to-tr from-blue-400 hover:from-blue-600 to-blue-200 hover:to-blue-400 flex items-center justify-center">
            <div>
              View all projects
              <img src="icons/right-arrow.png" alt="" className="h-5 w-5 mt-3 mx-auto" />
            </div>
          </a>
        </div>
      </section>
    );
}