import { IoBagHandleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import logo from "../../assest/logo.webp";

const CheckOutHead = () => {
    return (
        <>
            <header className="border-b shadow-sm px-6 sm:px-12 md:px-28 py-4 md:py-8 flex items-center justify-between bg-white">
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <Link to="/">
                        <img width={250} src={logo} alt="Logo" />
                    </Link>
                </div>

                <div>
                    <IoBagHandleOutline size={25} />
                </div>
            </header>
        </>
    )
}

export default CheckOutHead;
