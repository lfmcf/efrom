import Authenticated from "@/Layouts/Authenticated";
import React, { useState } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Card, Accordion } from 'react-bootstrap';
import { useForm } from '@inertiajs/inertia-react';
import Documents from "@/Layouts/Documents";
import Select from 'react-select';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Hqproject from "@/Layouts/Hqproject";
import Nohqproject from "@/Layouts/Nohqproject";

const Variation = ({countries}) => {

    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        identification: [],
        status: []
    });
    const selectInputRef = React.useRef({});
    const [isHq, setHq] = useState(false)
    const [statuscountries, setStatusContries] = useState([])
    const [formValues, setFormValues] = useState([{ document_type: "", document_title: "", language: "", version_date: "", dremarks: "", document: "" }])
    const [statusValues, setStatusValues] = useState([{ status: "", status_date: "", ectd: "", control: "", cdds: "", remarks: "", local_implementation: "", implimentation_deadline: "", actual_implementation: "" }])
    const [prductValues, setProductValues] = useState([{ product: "", procedure_type: "na", country: [], application_stage: "", rms: "", procedure_num: "", local_tradename: "", product_type: "" }])
    const [variationValues, setVariationValues] = useState([{ category: "", variation_type: "", submission_type: "", application_number: "", submission_number: "", submission_format: "", variation_reason: "" }])

    let addFormFields = () => {
        setFormValues([...formValues, { document_type: "", document_title: "", language: "", version_date: "", dremarks: "", document: "" }])
    }

    let addStatusFields = () => {
        setStatusValues([...statusValues, { status: "", status_date: "", ectd: "", control: "", cdds: "", remarks: "", local_implementation: "", implimentation_deadline: "", actual_implementation: "" }]);
    }

    let addProductFields = () => {
        setProductValues([...prductValues, { product: "", procedure_type: "", country: [], application_stage: "", rms: "", procedure_num: "", local_tradename: "", product_type: "" }])
    }

    let addVariationFields = () => {
        setVariationValues([...variationValues, { category: "", variation_type: "", submission_type: "", application_number: "", submission_number: "", submission_format: "", variation_reason: "" }])
    }

    let removeProductFields = (i) => {
        let newFormValues = [...prductValues];
        newFormValues.splice(i, 1);
        setProductValues(newFormValues)
    }

    let removeVariationFields = (i) => {
        let newFormValues = [...variationValues];
        newFormValues.splice(i, 1);
        setVariationValues(newFormValues)
    }

    let removeStatusFields = (i) => {
        let newFormValues = [...statusValues];
        newFormValues.splice(i, 1);
        setStatusValues(newFormValues)
    }

    let contries = countries.map(function (country) {
        return { value: country.country_name, label: country.country_name };
    })

    let handleChanged = (i, e) => {

        let newFormValues = [...prductValues];

        newFormValues[i][e.target.name] = e.target.value;

        setData("identification", newFormValues);
    }

    const handleSelectChange = (i, name) => {

        let newFormValues = [...prductValues];
        if (name.length > 0 && name) {
            newFormValues[i]["country"] = name;
        } else {
            newFormValues[i]["country"] = name.value;
        }

        setData("identification", newFormValues);

    }

    const handleprocedureChange = (i, e) => {
        let newFormValues = [...prductValues];
        console.log(selectInputRef.current[i])
        selectInputRef.current[i].setValue([]);

        newFormValues[i]["country"] = null;
        newFormValues[i]["procedure_type"] = e.target.value;

        setData("identification", newFormValues);
    }

    let handleStatusChanged = (i, e) => {

        let newFormValues = [...statusValues];
        newFormValues[i][e.target.name] = e.target.value;
        setData("status", newFormValues);
    }

    const handlehqChange = (e) => {
        setHq(e.target.checked)
    }


    const StatusProductChange = (e) => {

        data.identification.map(ele => {
            if (ele.product === e.target.value) {

                setStatusContries(ele.country)
            }
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(prductValues)
    }

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <h3 className="page-title">Variation</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card main-card">
                        <div className="card-body">
                            {/* <div className="card_title">
                                <h5>First Submission</h5>
                                <h5 className="subhead">All fields markedd with * are required</h5>
                            </div> */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0' }}>
                                <div>
                                    <input className="form-check-input" type="checkbox" value="checked" id="flexCheckDefault" onChange={handlehqChange} />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        HQ project
                                    </label>
                                </div>
                            </div>
                            {isHq ? <Hqproject countries={countries} /> : <Nohqproject countries={countries} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Variation;

Variation.layout = page => <Authenticated children={page} auth={page.props.auth} />