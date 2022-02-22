import React from 'react';
import { Link } from '@inertiajs/inertia-react';

const MultilevelMenu = ({ data }) => {
    const renderMenuItems = data => {
        return data.map((item, index) =>
            (item?.children && item?.children.length) ?
                (<li key={index}><Link href={"#"} >{item.name}</Link>
                    <ul className='submenu'>
                        {renderMenuItems(item.children)}
                    </ul>
                </li>
                ) : 
                <li key={index} >
                    <Link href={route(item.url)} className={route().current(item.url) ? 'active'  : ''}>
                        {item.name}
                    </Link>
                </li>
        )
    }
    return data && (
        <div className="multilevelMenu">
            <ul className="main-navigation">
                {renderMenuItems(data)}
            </ul>
        </div>
    );
}
export default MultilevelMenu;