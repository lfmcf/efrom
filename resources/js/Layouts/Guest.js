import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';

export default function Guest({ children }) {
    return (
        // <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
        //     <div>
        //         <Link href="/">
        //             <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
        //         </Link>
        //     </div>

        //     <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        //         {children}
        //     </div>
        // </div>
        <div className="main">
                
                 <div className="main_wrapper" style={{ display: 'flex' }}>
				    
                    <div className="main_card">
                        <div className="main_head">
                            {/* <h3 className="login_title">Welcome to</h3>
                            <h4 className="subhead">Start your business easily</h4> */}
                            <img src="../slogo.png" alt="logo" className='logo' />
                        </div>
                        {children}
                    </div>
                </div> 
            
        </div>
        
    );
}
