import Feed from '../../components/feed/Feed';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import './home.css';

export default function () {
    return (
        <>
            <Topbar />
            <div className='home'>
                <div className='homeWrapper'>
                    <Sidebar />
                    <Feed />
                </div>
            </div>
        </>
    );
}
