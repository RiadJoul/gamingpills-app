import Link from "next/link";
import { Role, User } from "../../generated/graphql";
import useAuth from "../../services/useAuth";


const PublicNavigation = () => {

    const {user}:User = useAuth();
    return (
        <header>
            <nav className="border-gray-200 px-4 lg:px-6 py-5 bg-gradient-to-tr from-black to-dark">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <div className="flex flex-col justify-center">
                    {/* <img src="images/logo/gamingpills.svg" className="h-6 sm:h-9" alt="Gamingpills" /> */}
                    <Link href="/">
                        <span className="self-center text-2xl lg:text-4xl font-bold whitespace-nowrap text-primary cursor-pointer">Gamingpills</span>
                    </Link>
                    </div>
                    <div className="flex items-center lg:order-2">
                        {
                            !user && <>
                            <Link href={"/auth/signup"}><a className="text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 hover:bg-gray-700 duration-300 focus:outline-none ">Sign in</a></Link>
                        <Link href={"/auth/login"}><a className="text-white bg-primary hover:bg-primary-focus duration-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 focus:outline-none">Log in</a></Link>
                            </>
                        }
                        {
                            user && user.role == Role.Player && <Link href={"/player/feed"}><a className="text-white bg-primary hover:bg-primary-focus duration-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 focus:outline-none">Feed</a></Link>
                        }
                        {
                            user && user.role == Role.Admin && <Link href={"/admin/dashboard"}><a className="text-white bg-primary hover:bg-primary-focus duration-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 focus:outline-none">Dashboard</a></Link>
                        }
                        <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm rounded-lg lg:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <a href="#" className="block py-2 pr-4 pl-3 text-white hover:text-primary duration-300">How it works</a>
                            </li>
                            <li>
                                <Link href="/faq" className="block py-2 pr-4 pl-3 text-white hover:text-primary duration-300">
                                <a href="#" className="block py-2 pr-4 pl-3 text-white hover:text-primary duration-300 uppercase">faq</a>
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pr-4 pl-3 text-white hover:text-primary duration-300">General site rules</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default PublicNavigation;