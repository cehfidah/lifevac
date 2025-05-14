import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const DashboardLayout = () => {
    return (
        <>
            <Header />
            <div className='bg-[#f5f5f5]' style={{ minHeight: "calc(100vh - 155.5px)" }}>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default DashboardLayout;
