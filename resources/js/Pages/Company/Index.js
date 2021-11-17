import Authenticated from '@/Layouts/Authenticated';
import React, {useState} from 'react';

const Index = (props) => {
    return(
        <>
            <div className="row">
                <div className="col-md-12">
                    <h3 className="page-title">New Compnay</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    
                </div>
            </div>
        </>
    )
}

export default Index;

Index.layout = page => <Authenticated children={page} auth={page.props.auth} />