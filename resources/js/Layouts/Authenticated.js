import React, { useState, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/inertia-react';
import  Scrollbar from "smooth-scrollbar";
import MultilevelMenu from '@/Components/MultilevelMenu';
// import 'smooth-scrollbar/dist/smooth-scrollbar.css';

export default function Authenticated({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [whichMenu, SetwichMenu] = useState('');
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
        console.log(id)
        setSettings(settings =>  settings.map(item => item.id === id ? {...item, open: !item.open } : item));
    };

    const options = {
        damping: 0.1,
        thumbMinSize: 5,
        renderByPixels: true
    }

    const handleSelectMenu = (menu) => {
        SetwichMenu(menu);
    }

    useEffect(() => {
        Scrollbar.init(document.querySelector('.sidebar_content'), options)
    }, [])

    const madata = [
        {
            name: "Registration Creation",
            children: [
                {
                    name: "Medicinal Product",
                    url: "/finished"
                },
                {
                    name: "Company Registration",
                    url: "/company"
                }
            ],
        },
        {
            name: "Lifecycle Mnagement",
            children: [
                {
                    name: "Variation",
                    url: "/variation"
                },
                {
                    name: "Renewal",
                    url: "/renouvellement"
                },
                {
                    name: "Transfer",
                    url: "/transfer"
                },
                {
                    name: "Others",
                    children: [
                        {
                            name: "Baseline",
                            url: '/baseline'
                        }
                    ]
                }
            ]
        },
        {
            name: "Registration Termination",
            url: "/registrationtermination"
        }
    ]

    const clinicaldata = [
        {
            name: "Registration Creation",
            url: "/clinical",
        },
        {
            name: "Lifecycle Mnagement",
            children: [
                {
                    name: "Amendments",
                    url: "/amendments"
                }
            ]
        },
        {
            name: "Registration Termination",
            url: "/cregistrationtermination"
        }
    ];

    const devicesdata = [
        {
            name: "Registration Creation",
            url: "",
        },
        {
            name: "Lifecycle Mnagement",
            url: ""
        },
        {
            name: "Registration Termination",
            url: "",
        }
    ]
    
    
    return (
        <div>
            
            <div className="topbar">
                <div className="tleft">
                {/*<Link href={route('dashboard')} style={{margin:'auto 100px', color:"white"}}>Logo</Link>
                    <div>
                        <button style={{width:'60px', height:'60px', display:'flex', border:'none',justifyContent:'center',alignItems:'center',background:'transparent'}}>
                            <span className="lnr lnr-menu" style={{fontSize:'16px', color:"#3bb78f"}}></span>
                        </button>
                        
                    </div>
                    */}
                </div>
                <div className='tmiddle' >
                    {/* <MultilevelMenu data={menuData} /> */}
                       
                    {whichMenu === 'ma' ? 
                    <MultilevelMenu data={madata} /> : whichMenu === 'clinical' ? 
                    <MultilevelMenu data={clinicaldata} /> : whichMenu === 'devices' ? 
                    <MultilevelMenu data={devicesdata} />: '' }
                </div>
                <div className="tright">
                    <div className="topbar_right">
                        <div className="topbar_profile">
                            <button className="topbar_avatar" onClick={() => setTopbarnav(!topbarnav)}>
                                <img className="topbar_avatar_img" src="..\avatar.png" />
                                <p>{auth.user.name}</p>
                                <svg className="mdi-icon topbar_icon" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path></svg>
                            </button>
                            <div className="topbar_dropdown_wrap" style={{display: topbarnav ? 'flex' : 'none'}}>
                                <div className="topbar_dropdown">
                                    <Link className="topbar_link" href="#" as="a">
                                        <p className="topbar_link_title">My Profile</p>
                                    </Link>
                                    <Link className="topbar_link" href={route('logout')} method="post" as="button">
                                        <p className="topbar_link_title">Log Out</p>
                                    </Link>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="sidebar">
                <div className="sidebar_content">
                    <ul className="sidebar_block">
                        <Link className={`topbar_link ${route().current('dashboard') ? `sidebar_link_active` : ''}`} href={route('dashboard')} onClick={() =>SetwichMenu('')}>
                            <li className="sidebar_link" >
                                <span className="sidebar_link_icon lnr lnr-home"></span>
                                <p className="sidebar_link_title">Dashboard</p>
                            </li>
                        </Link>
                        <div>
                            <button className="sidebar_link topbar_link" onClick={() => handleClick(1)}>
                                <span className="sidebar_link_icon lnr lnr-file-add"></span>
                                <p className="sidebar_link_title">Data Entry Request</p>
                                <span style={{ transform: settings.find(item => item.id === 1).open ? 'rotate(90deg)' : 'rotate(0deg)' }} className="sidebar_category_icon lnr lnr-chevron-right"></span>
                            </button>
                            <div style={{ display: settings.find(item => item.id === 1).open ? 'block' : 'none' }}>
                                <ul className="sidebar_submenu">
                                    <button className="sidebar_link topbar_link" onClick={() => handleSelectMenu('ma')}>
                                        <p className="sidebar_link_title">Marketing Authorization</p>
                                    </button>
                                    <button className="sidebar_link topbar_link" onClick={() => handleSelectMenu('clinical')}>
                                        <p className="sidebar_link_title">Clinical</p>
                                    </button>
                                    <button className="sidebar_link topbar_link" onClick={() => handleSelectMenu('devices')}>
                                        <p className="sidebar_link_title">Devices</p>
                                    </button>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <button className="sidebar_link topbar_link" onClick={() => setDropdownnav((previousState) => !previousState)}>
                                <span className="sidebar_link_icon lnr lnr-history"></span>
                                <p className="sidebar_link_title">Contact</p>
                                <span style={{ transform: dropdownnav ? 'rotate(90deg)' : 'rotate(0deg)' }} className="sidebar_category_icon lnr lnr-chevron-right"></span>
                            </button>
                            <div style={{ display: dropdownnav ? 'block' : 'none' }}>
                                <ul className="sidebar_submenu">
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
