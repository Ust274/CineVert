
import { Link } from "react-router-dom"

export const Footer = () => {
  return (
    <div className="vmax-w-screen-xl vertical-align: text-bottom bg-gray-800">
     

      <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800 vertical-align: text-bottom;">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 ">© 2024 < a href="/" className="hover:underline"> CineVert </a>      All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                  < Link to="https://www.instagram.com/utsav7200/" className="hover:underline me-4 md:me-6">Instagram</Link>
              </li>
              <li>
                  < Link to="https://gist.github.com/Ust274#" className="hover:underline me-4 md:me-6">Github</Link>
              </li>
          </ul>
          </div>
      </footer>

      </div>
  )
}
