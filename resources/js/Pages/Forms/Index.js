import React from 'react';
import Authenticated from '@/Layouts/Authenticated';

export default function Index(props) {
    return(
        <Authenticated auth={props.auth}>
            <h1>Interaction</h1>
            <div>
                <form>
                    <div>
                        <label>Interaction type</label>
                        <input type="text"  />
                    </div>
                </form>
            </div>
        </Authenticated>
    )
}