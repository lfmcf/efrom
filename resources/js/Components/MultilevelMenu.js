import React, {useState} from 'react';
import { Link } from '@inertiajs/inertia-react';
import {CSSTransition} from 'react-transition-group';

const MultilevelMenu = ({ data }) => {
    const renderMenuItems = data => {
        return data.map((item, index) =>
            (item?.children && item?.children.length) ?
                (<li key={index}><Link href={"#"}>{item.name}</Link>
                    <ul className='submenu'>
                        {renderMenuItems(item.children)}
                    </ul>
                </li>
                ) : <li key={index}><Link href={item.url}>{item.name}</Link></li>
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