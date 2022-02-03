import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import {key_dates_list, operations, packageCondistion, product_name, procedure_type, apf, atc, SlType,indications, status } from '@/Components/List';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Select from 'react-select';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function VerticalTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label="General information" {...a11yProps(0)} />
                <Tab label="Basic information" {...a11yProps(1)} />
                <Tab label="Dosage Form / ATC" {...a11yProps(2)} />
                <Tab label="Orphan Drug Details" {...a11yProps(3)} />
                <Tab label="Under Intensive Monitoring Details" {...a11yProps(4)} />
                <Tab label="Key Dates / Alternate Numbers" {...a11yProps(5)} />
                <Tab label="Formulations" {...a11yProps(6)} />
                <Tab label="Packagings" {...a11yProps(7)} />
                <Tab label="Indications" {...a11yProps(8)} />
                <Tab label="Manufacturing & Supply Chain" {...a11yProps(9)} />
                <Tab label="Status Details" {...a11yProps(10)} />
                <Tab label="Documents" {...a11yProps(11)} />

            </Tabs>
            <TabPanel value={value} index={0} className="muitab">
                
                <div className='inline_form'>
                    <div className="form_group_inline">
                        <span className="form_group_label">Procedure Type (*)</span>
                        <div className="form_group_field">

                            <Select options={procedure_type}
                                name="procedure_type"
                                // onChange={handleSelectChange}
                                className="basic"
                                classNamePrefix="basic"
                                placeholder=''
                                isClearable
                            />
                        </div>
                        {/* <p className="errors_wrap" style={{ display: errors.procedure_type ? 'inline-block' : 'none' }}>{errors.procedure_type}</p> */}
                    </div>
                    <div className="form_group_inline">
                        <span className="form_group_label">Country</span>
                        <div className="form_group_field">
                            <Select 
                                name="country"
                                // onChange={(e, k) => handleCountryChange(e, k)}
                                className="basic"
                                classNamePrefix="basic"
                                // isMulti={data.procedure_type === 'Decentralized' || data.procedure_type === 'Mutual Recognition' ? true : false}
                                // ref={ele => countryRef.current = ele}
                                placeholder=''
                            />
                        </div>
                    </div>
                    <div className="form_group_inline" >
                        <span className="form_group_label">RMS</span>
                        <div className="form_group_field">
                            <Select 
                                name="rms"
                                // onChange={handleSelectChange}
                                className="basic"
                                classNamePrefix="basic"
                                placeholder=''
                                isClearable
                            />
                        </div>
                    </div>
                </div>
                <div className='inline_form'>
                    <div className="form_group_inline">
                        <span className="form_group_label">Procedure Number</span>
                        <div className="form_group_field">
                            <input type="text" name="procedure_number" onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form_group_inline">
                        <span className="form_group_label">Product Type (*)</span>
                        <div className="form_group_field">

                            <Select options={[
                                { value: 'Finished', label: 'Finished' },
                                { value: 'References', label: 'References' },
                            ]}
                                name="product_type"
                                // onChange={handleSelectChange}
                                className="basic"
                                classNamePrefix="basic"
                                placeholder=''
                                // styles={selectStyles(errors.product_type)}
                                isClearable
                            />
                        </div>
                        {/* <p className="errors_wrap" style={{ display: errors.product_type ? 'inline-block' : 'none' }}>{errors.product_type}</p> */}
                    </div>

                    <div className="form_group_inline" >
                        <span className="form_group_label">Application Stage (*)</span>
                        <div className="form_group_field">

                            <Select options={[
                                { value: 'Marketing Authorisation', label: 'Marketing Authorisation' },
                                { value: 'APSI / NPP', label: 'APSI / NPP' },
                            ]}
                                name="application_stage"
                                // onChange={handleSelectChange}
                                className="basic"
                                classNamePrefix="basic"
                                placeholder=''
                                // styles={selectStyles(errors.application_stage)}
                                isClearable
                            />
                        </div>
                        {/* <p className="errors_wrap" style={{ display: errors.application_stage ? 'inline-block' : 'none' }}>{errors.application_stage}</p> */}
                    </div>
                </div>
                
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item Four
            </TabPanel>
            <TabPanel value={value} index={4}>
                Item Five
            </TabPanel>
            <TabPanel value={value} index={5}>
                Item Six
            </TabPanel>
            <TabPanel value={value} index={6}>
                Item Seven
            </TabPanel>
        </Box>
    );
}
