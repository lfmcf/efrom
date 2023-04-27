import React from "react";
import moment from "moment";
const DocumentShow = (props) => {
    const {docs} = props
    return(
        <>
            {docs.map((element, index) => (
                <div key={index}>
                    <h2 className='sous-heading-show'>Document - {index + 1}</h2>
                    <div>
                        <table className='showTable'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Document type</td>
                                    <td>{element.document_type ? element.document_type.value : ''}</td>
                                </tr>
                                <tr>
                                    <td>Document title</td>
                                    <td>{element.document_title}</td>
                                </tr>
                                <tr>
                                    <td>Language</td>
                                    <td>{element.language ? element.language.value : ''}</td>
                                </tr>
                                <tr>
                                    <td>Version date</td>
                                    <td>{element.version_date ? moment(element.version_date).format('DD-MMM-yy') : ''}</td>
                                </tr>
                                <tr>
                                    <td>Ccds/core pil ref n°</td>
                                    <td>{element.cdds}</td>
                                </tr>
                                <tr>
                                    <td>Remarks</td>
                                    <td>{element.dremarks}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </>
    )
}

export default DocumentShow;