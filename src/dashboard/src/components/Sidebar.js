import React from 'react';
import SidebarItem from './SidebarItem.js';

function Sidebar(props) {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            {/*<!-- Sidebar - Brand -->*/}
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                <div className="sidebar-brand-icon">
                    <i className="fas fa-chart-line"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Admin</div>
            </a>

            {/*<!-- Divider -->*/}
            <hr className="sidebar-divider my-0"/>

            {/*<!-- Nav Item - Dashboard -->*/}

            <SidebarItem active={true} icon='fa-tachometer-alt' text='Dashboard' url='/'/>

            {/*<!-- Divider -->*/}
            <hr className="sidebar-divider"/>

            {/*<!-- Heading -->*/}
            <div className="sidebar-heading">Actions</div>

            {/*<!-- Nav Item - Pages -->*/}
            <SidebarItem active={false} icon='fa-fw fa-folder' text='Pages' url='/'/>

            {/*<!-- Nav Item - Charts -->*/}
            <SidebarItem active={false} icon='fa-fw fa-chart-area' text='Charts' url='/'/>

            {/*<!-- Nav Item - Tables -->*/}
            <SidebarItem active={false} icon='fas fa-fw fa-table' text='Tables' url='/'/>


            {/*<!-- Divider -->*/}
            <hr className="sidebar-divider d-none d-md-block"/>
        </ul>

    );
}

export default Sidebar;