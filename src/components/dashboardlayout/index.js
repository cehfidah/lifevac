import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const DashboardLayout = () => {
    return (
        <>
            <Header />
            <div style={{ minHeight: "calc(100vh - 545px)" }}>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default DashboardLayout;
