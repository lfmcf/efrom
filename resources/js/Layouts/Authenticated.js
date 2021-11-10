import React, { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/inertia-react';
import Scrollbar from 'react-smooth-scrollbar';

export default function Authenticated({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [dropdownnav, setDropdownnav] = useState(false);
    const [topbarnav, setTopbarnav] = useState(false)
    
    
    return (
        <div>
            <div className="topbar">
                <div className="tleft">
                    <div>
                        <button style={{width:'60px', height:'60px', display:'flex', border:'none',justifyContent:'center',alignItems:'center',background:'transparent'}}>
                            <span className="lnr lnr-menu" style={{fontSize:'16px'}}></span>
                        </button>
                        
                    </div>
                    <Link href={route('dashboard')} style={{margin:'auto 0'}}>Logo</Link>
                </div>
                <div className="tright">
                    <div className="topbar_right">
                        <div className="topbar_profile">
                            <button className="topbar_avatar" onClick={() => setTopbarnav(!topbarnav)}>
                                <img className="topbar_avatar_img" />
                                <p>{auth.user.name}</p>
                                <svg className="mdi-icon topbar_icon" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path></svg>
                            </button>
                            <div className="topbar_dropdown_wrap" style={{display: topbarnav ? 'flex' : 'none'}}>
                                <div className="topbar_dropdown">
                                    <Link className="topbar_link" href="#">
                                        <p className="topbar_link_title">My Profile</p>
                                    </Link>
                                    <Link className="topbar_link" href={route('logout')} method="post" as="a">
                                        <p className="topbar_link_title">Log Out</p>
                                    </Link>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="sidebar">
                <Scrollbar damping={0}>
                    <div>
                        <div className="sidebar_content">
                            <ul className="sidebar_block">
                                <Link className={`topbar_link ${route().current('dashboard') ? `sidebar_link_active` : ''}`} href={route('dashboard')}>
                                    <li className="sidebar_link" >
                                        <span className="sidebar_link_icon lnr lnr-home"></span>
                                        <p className="sidebar_link_title">Dashboard</p>
                                    </li>
                                </Link>
                                <div>
                                    <button className="sidebar_link topbar_link" onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}>
                                        <span className="sidebar_link_icon lnr lnr-file-add"></span>
                                        <p className="sidebar_link_title">Registration Creation</p>
                                        <span style={{transform: showingNavigationDropdown ? 'rotate(90deg)': 'rotate(0deg)'}} className="sidebar_category_icon lnr lnr-chevron-right"></span>
                                       
                                    </button>
                                    <div style={{display: showingNavigationDropdown ? 'block' : 'none'}}>
                                        <ul className="sidebar_submenu">
                                            <Link className={`topbar_link ${route().current('finished') ? `sidebar_link_active` : ''}`} href={route('finished')}>
                                                <li className="sidebar_link">
                                                    <p className="sidebar_link_title">Finished Product</p>
                                                </li>
                                            </Link>
                                            <Link className={`topbar_link ${route().current('clinical') ? `sidebar_link_active` : ''}`} href={route('clinical')} >
                                                <li className="sidebar_link">
                                                    <p className="sidebar_link_title">Clinical</p>
                                                </li>
                                            </Link>
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <button className="sidebar_link topbar_link" onClick={() => setDropdownnav((previousState) => !previousState)}>
                                        <span className="sidebar_link_icon lnr lnr-history"></span>
                                        <p className="sidebar_link_title">LifeCycle Management</p>
                                        <span style={{transform: dropdownnav ? 'rotate(90deg)': 'rotate(0deg)'}} className="sidebar_category_icon lnr lnr-chevron-right"></span>
                                    </button>
                                    <div style={{display: dropdownnav ? 'block' : 'none'}}>
                                        <ul className="sidebar_submenu">
                                            <Link className={`topbar_link ${route().current('variation') ? `sidebar_link_active` : ''}`} href={route('variation')}>
                                                <li className="sidebar_link ">
                                                    <p className="sidebar_link_title">Variation</p>
                                                </li>
                                            </Link>
                                            <Link className={`topbar_link ${route().current('renouvellement') ? `sidebar_link_active` : ''}`} href={route('renouvellement')}>
                                                <li className="sidebar_link ">
                                                    <p className="sidebar_link_title">Renouvellement</p>
                                                </li>
                                            </Link>
                                            <Link href="#">
                                                <li className="sidebar_link topbar_link">
                                                    <p className="sidebar_link_title">PSUR</p>
                                                </li>
                                            </Link>
                                            <Link href="#">
                                                <li className="sidebar_link topbar_link">
                                                    <p className="sidebar_link_title">Baseline</p>
                                                </li>
                                            </Link>
                                        </ul>
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </div>
                    
                </Scrollbar>
            </div>
            <main>
                <div className="container_main">
                    <div className="container">
                        {children}
                    </div>
                </div>
            </main>
        </div>
        
    );
}
