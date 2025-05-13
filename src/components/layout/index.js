import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
    return (
        <>
            <Header />
            <div className='min-h-screen'>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default Layout;
