import React from 'react';
import Authenticated from "@/Layouts/Authenticated";
import EditHqproject from "@/Layouts/EditHqproject";
import EditNoHqproject from "@/Layouts/EditNoHqproject";

const Edit = (props) => {
    const {variation, countries, products, auth} = props;
    if (variation.isHq) {
        return (
            <EditHqproject products={products} variation={variation} countries={countries} user={auth.user} />
        )
    } else {
        return(
            <EditNoHqproject products={products} variation={variation} countries={countries} user={auth.user}  />
        )
    }
    
}

Edit.layout = page => <Authenticated children={page} auth={page.props.auth} />

export default Edit;