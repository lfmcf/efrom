import React, { useState, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/inertia-react';
import  Scrollbar from "smooth-scrollbar";
// import 'smooth-scrollbar/dist/smooth-scrollbar.css';

export default function Authenticated({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [dropdownnav, setDropdownnav] = useState(false);
    const [topbarnav, setTopbarnav] = useState(false)
    const [settings, setSettings] = useState( [{ id: 1, open: false }, 
        { id: 2, open: false }, 
        { id: 3, open: false }, 
        { id: 4, open: false }, 
        { id: 5, open: false }, 
        { id: 6, open: false }, 
        { id: 7, open: false }, 
        { id: 8, open: false }, 
        { id: 9, open: false },
        { id: 10, open: false },
        { id: 11, open: false },
        { id: 12, open: false },
    ]);

    const handleClick = id => {
        
        setSettings(settings =>  settings.map(item => item.id === id ? {...item, open: !item.open } : item));
        
    };

    const options = {
        damping: 0.1,
        thumbMinSize: 5,
        renderByPixels: true
    }

    useEffect(() => {
        Scrollbar.init(document.querySelector('.sidebar_content'), options)
    }, [])
    
    
    return (
        <div>
            <div className="topbar">
                <div className="tleft">
                    <div>
                        <button style={{width:'60px', height:'60px', display:'flex', border:'none',justifyContent:'center',alignItems:'center',background:'transparent'}}>
                            <span className="lnr lnr-menu" style={{fontSize:'16px', color:"#fff"}}></span>
                        </button>
                        
                    </div>
                    <Link href={route('dashboard')} style={{margin:'auto 0', color:"white"}}>Logo</Link>
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
                {/* <Scrollbar style={{ height: 'calc(100vh - 60px)' }}> */}
                    {/* <div> */}
                        <div className="sidebar_content">
                            <ul className="sidebar_block">
                                <Link className={`topbar_link ${route().current('dashboard') ? `sidebar_link_active` : ''}`} href={route('dashboard')}>
                                    <li className="sidebar_link" >
                                        <span className="sidebar_link_icon lnr lnr-home"></span>
                                        <p className="sidebar_link_title">Dashboard</p>
                                    </li>
                                </Link>
                                <div>
                                    <button className="sidebar_link topbar_link" onClick={() => handleClick(1)}>
                                        <span className="sidebar_link_icon lnr lnr-file-add"></span>
                                        <p className="sidebar_link_title">Data Entry Request</p>
                                        <span style={{transform: settings.find(item => item.id === 1).open ? 'rotate(90deg)': 'rotate(0deg)'}} className="sidebar_category_icon lnr lnr-chevron-right"></span>
                                       
                                    </button>
                                    <div style={{ display: settings.find(item => item.id === 1).open ? 'block' : 'none' }}>
                                        <ul className="sidebar_submenu">
                                            <button className="sidebar_link topbar_link" onClick={() => handleClick(2)}>
                                                {/* <span className="sidebar_link_icon lnr lnr-file-add"></span> */}
                                                <p className="sidebar_link_title">Marketing Authorization</p>
                                                <span style={{ transform: settings.find(item => item.id === 2).open ? 'rotate(90deg)' : 'rotate(0deg)' }} className="sidebar_category_icon lnr lnr-chevron-right"></span>
                                            </button>
                                            <div style={{ display: settings.find(item => item.id === 2).open ? 'block' : 'none' }}>
                                                <ul className="sidebar_submenu">
                                                    <button className="sidebar_link topbar_link" onClick={() => handleClick(3)}>
                                                        {/* <span className="sidebar_link_icon lnr lnr-file-add"></span> */}
                                                        <p className="sidebar_link_title h_1">Registration Creation</p>
                                                        <span style={{ transform: settings.find(item => item.id === 3).open ? 'rotate(90deg)' : 'rotate(0deg)' }} className="sidebar_category_icon lnr lnr-chevron-right"></span>
                                                    </button>
                                                    <div style={{ display: settings.find(item => item.id === 3).open ? 'block' : 'none' }}>
                                                        <ul className="sidebar_submenu">
                                                            <Link className={`topbar_link ${route().current('finished') ? `sidebar_link_active` : ''}`} href={route('finished')}>
                                                                <li className="sidebar_link">
                                                                    <p className="sidebar_link_title h_2">Medicinal Product</p>
                                                                </li>
                                                            </Link>
                                                            <Link className={`topbar_link ${route().current('comapny') ? `sidebar_link_active` : ''}`} href={route('company')}>
                                                                <li className="sidebar_link">
                                                                    <p className="sidebar_link_title h_2">Company Registration</p>
                                                                </li>
                                                            </Link>
                                                        </ul>
                                                    </div>
                                                    <button className="sidebar_link topbar_link" onClick={() => handleClick(4)}>
                                                        {/* <span className="sidebar_link_icon lnr lnr-file-add"></span> */}
                                                        <p className="sidebar_link_title h_1">Lifecycle Management</p>
                                                        <span style={{ transform: settings.find(item => item.id === 4).open ? 'rotate(90deg)' : 'rotate(0deg)' }} className="sidebar_category_icon lnr lnr-chevron-right"></span>
                                                    </button>
                                                    <div style={{ display: settings.find(item => item.id === 4).open ? 'block' : 'none' }}>
                                                        <ul className="sidebar_submenu">
                                                            <Link className={`topbar_link ${route().current('variation') ? `sidebar_link_active` : ''}`} href={route('variation')}>
                                                                <li className="sidebar_link ">
                                                                    <p className="sidebar_link_title h_2">Variation</p>
                                                                </li>
                                                            </Link>
                                                            <Link className={`topbar_link ${route().current('renouvellement') ? `sidebar_link_active` : ''}`} href={route('renouvellement')}>
                                                                <li className="sidebar_link ">
                                                                    <p className="sidebar_link_title h_2">Renewal</p>
                                                                </li>
                                                            </Link>
                                                            <Link className={`topbar_link ${route().current('transfer') ? `sidebar_link_active` : ''}`} href={route('transfer')}>
                                                                <li className="sidebar_link topbar_link">
                                                                    <p className="sidebar_link_title h_2">Transfer</p>
                                                                </li>
                                                            </Link>
                                                            <button className="sidebar_link topbar_link" onClick={() => handleClick(8)}>
                                                                {/* <span className="sidebar_link_icon lnr lnr-file-add"></span> */}
                                                                <p className="sidebar_link_title h_2">Others</p>
                                                                <span style={{ transform: settings.find(item => item.id === 8).open ? 'rotate(90deg)' : 'rotate(0deg)' }} className="sidebar_category_icon lnr lnr-chevron-right"></span>
                                                            </button>
                                                            <div style={{ display: settings.find(item => item.id === 8).open ? 'block' : 'none' }}>
                                                                <ul className="sidebar_submenu">
                                                                    <Link className={`topbar_link ${route().current('baseline') ? `sidebar_link_active` : ''}`} href={route('baseline')}>
                                                                        <li className="sidebar_link topbar_link">
                                                                            <p className="sidebar_link_title h_3">Baseline</p>
                                                                        </li>
                                                                    </Link>
                                                                    <Link href="#">
                                                                        <li className="sidebar_link topbar_link">
                                                                            <p className="sidebar_link_title h_3">Safety Reports</p>
                                                                        </li>
                                                                    </Link>
                                                                    <Link href="#">
                                                                        <li className="sidebar_link topbar_link">
                                                                            <p className="sidebar_link_title h_3">RMP</p>
                                                                        </li>
                                                                    </Link>
                                                                    <Link href="#">
                                                                        <li className="sidebar_link topbar_link">
                                                                            <p className="sidebar_link_title h_3">PAMs</p>
                                                                        </li>
                                                                    </Link>
                                                                    <Link href="#">
                                                                        <li className="sidebar_link topbar_link">
                                                                            <p className="sidebar_link_title h_3">Commitment</p>
                                                                        </li>
                                                                    </Link>
                                                                    <Link href="#">
                                                                        <li className="sidebar_link topbar_link">
                                                                            <p className="sidebar_link_title h_3">Interaction</p>
                                                                        </li>
                                                                    </Link>
                                                                </ul>
                                                            </div>
                                                        </ul>
                                                    </div>
                                                    <Link className={`topbar_link ${route().current('registrationtermination') ? `sidebar_link_active` : ''}`} href={route('registrationtermination')}>
                                                        <li className="sidebar_link topbar_link">
                                                            <p className="sidebar_link_title h_1">Registration Termination</p>
                                                        </li>
                                                    </Link>
                                                </ul>
                                                
                                            </div>

                                            <button className="sidebar_link topbar_link" onClick={() => handleClick(10)}>
                                                {/* <span className="sidebar_link_icon lnr lnr-file-add"></span> */}
                                                <p className="sidebar_link_title">Clinical</p>
                                                <span style={{ transform: settings.find(item => item.id === 10).open ? 'rotate(90deg)' : 'rotate(0deg)' }} className="sidebar_category_icon lnr lnr-chevron-right"></span>
                                            </button>
                                            <div style={{ display: settings.find(item => item.id === 10).open ? 'block' : 'none' }}>
                                                <ul className="sidebar_submenu">
                                                    <Link className={`topbar_link ${route().current('clinical') ? `sidebar_link_active` : ''}`} href={route('clinical')}>
                                                        <li className="sidebar_link topbar_link">
                                                            <p className="sidebar_link_title h_1">Registration Creation</p>
                                                        </li>
                                                    </Link>
                                                    <button className="sidebar_link topbar_link" onClick={() => handleClick(11)}>
                                                        {/* <span className="sidebar_link_icon lnr lnr-file-add"></span> */}
                                                        <p className="sidebar_link_title h_1">Lifecycle Management</p>
                                                        <span style={{ transform: settings.find(item => item.id === 11).open ? 'rotate(90deg)' : 'rotate(0deg)' }} className="sidebar_category_icon lnr lnr-chevron-right"></span>
                                                    </button>
                                                    <div style={{ display: settings.find(item => item.id === 11).open ? 'block' : 'none' }}>
                                                        <ul className="sidebar_submenu">
                                                            <Link className={`topbar_link ${route().current('amendments') ? `sidebar_link_active` : ''}`} href={route('amendments')}>
                                                                <li className="sidebar_link topbar_link">
                                                                    <p className="sidebar_link_title h_2">Amendments</p>
                                                                </li>
                                                            </Link>
                                                        </ul>
                                                    </div>
                                                    <Link className={`topbar_link ${route().current('cregistrationtermination') ? `sidebar_link_active` : ''}`} href={route('cregistrationtermination')}>
                                                        <li className="sidebar_link topbar_link">
                                                            <p className="sidebar_link_title h_1">Registration Termination</p>
                                                        </li>
                                                    </Link>
                                                </ul>
                                            </div>

                                            <button className="sidebar_link topbar_link" onClick={() => handleClick(6)}>
                                                {/* <span className="sidebar_link_icon lnr lnr-file-add"></span> */}
                                                <p className="sidebar_link_title">Devices</p>
                                                <span style={{ transform: settings.find(item => item.id === 6).open ? 'rotate(90deg)' : 'rotate(0deg)' }} className="sidebar_category_icon lnr lnr-chevron-right"></span>
                                            </button>
                                            <div style={{ display: settings.find(item => item.id === 6).open ? 'block' : 'none' }}>
                                                <ul className="sidebar_submenu">
                                                    <Link href="#">
                                                        <li className="sidebar_link topbar_link">
                                                            <p className="sidebar_link_title h_1">Registration Creation</p>
                                                        </li>
                                                    </Link>
                                                    <Link href="#">
                                                        <li className="sidebar_link topbar_link">
                                                            <p className="sidebar_link_title h_1">Lifecycle Management</p>
                                                        </li>
                                                    </Link>
                                                    <Link href="#">
                                                        <li className="sidebar_link topbar_link">
                                                            <p className="sidebar_link_title h_1">Registration Termination</p>
                                                        </li>
                                                    </Link>
                                                </ul>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <button className="sidebar_link topbar_link" onClick={() => setDropdownnav((previousState) => !previousState)}>
                                        <span className="sidebar_link_icon lnr lnr-history"></span>
                                        <p className="sidebar_link_title">Contact</p>
                                        <span style={{transform: dropdownnav ? 'rotate(90deg)': 'rotate(0deg)'}} className="sidebar_category_icon lnr lnr-chevron-right"></span>
                                    </button>
                                    <div style={{display: dropdownnav ? 'block' : 'none'}}>
                                        <ul className="sidebar_submenu">
                                            {/* <Link className={`topbar_link ${route().current('variation') ? `sidebar_link_active` : ''}`} href={route('variation')}>
                                                <li className="sidebar_link ">
                                                    <p className="sidebar_link_title">Variation</p>
                                                </li>
                                            </Link>
                                            <Link className={`topbar_link ${route().current('renouvellement') ? `sidebar_link_active` : ''}`} href={route('renouvellement')}>
                                                <li className="sidebar_link ">
                                                    <p className="sidebar_link_title">Renouvellement</p>
                                                </li>
                                            </Link> */}
                                            <Link href="#">
                                                <li className="sidebar_link topbar_link">
                                                    <p className="sidebar_link_title h_1">User Creation Request</p>
                                                </li>
                                            </Link>
                                           
                                        </ul>
                                    </div>
                                </div>
                            </ul>
                        </div>
                    {/* </div> */}
                    
                {/* </Scrollbar> */}
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
