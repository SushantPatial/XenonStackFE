import React, { useState } from 'react';
import './Contact.css';
import axios from 'axios';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Contact = () => {

    const [contactInfo, setContactInfo] = useState({
        name: "",
        email: "",
        number: "",
        message: ""
    });

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);

    function formUpdate(e) {
        const { name, value } = e.target;
        setContactInfo(function () {
            return {
                ...contactInfo,
                [name]: value
            }
        })
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, number, message } = contactInfo;

        try {
            const res = await axios.post("https://xenonstack-sp.herokuapp.com/api/contact", {
                name, email, number, message
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setContactInfo(function () {
                return {
                    ...contactInfo,
                    email: "", name: "", number: "", message: ""
                }
            });

            setOpenSuccess(true);

        } catch (error) {
            const errors = error.response.data.message;
            const temp = [];
            
            for (let i = 0; i < errors.length; i++) {
                temp.push(errors[i].msg);
            }
            setErrorMessage(temp);

            // console.log(error);
            setOpenError(true);
        }
    }

    const handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenSuccess(false);
    };
    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenError(false);
    };

    return (
        <main>
            <Snackbar open={openSuccess} autoHideDuration={5000} onClose={handleSuccessClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={handleSuccessClose} severity="success" sx={{ width: '100%' }}>
                    Message sent successfully!
                </Alert>
            </Snackbar>
            {errorMessage && errorMessage.length > 0 &&
            <Snackbar open={openError} autoHideDuration={5000} onClose={handleErrorClose}>
                <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
                    {errorMessage.map(function(error, index) {
                        return (
                            <li key={index}> {error} </li>
                        )
                    })}
                </Alert>
            </Snackbar>
            }
            <div className='contact'>
                <div className='container'>
                    <div className='contact-wrapper row'>
                        <div className='contact-left col-md-5'>
                            <h2>Contact Us</h2>
                            <h6>Any questions or remarks? Just write us a message!</h6>
                            <div className='contact-links'>
                                <span>
                                    <EmailIcon className='icon' />
                                    <div href="tel:+91 9999 99999">
                                        <a href="+91 9999 99999">+91 9999-99999</a>
                                    </div>
                                </span>
                                <span><PhoneIcon className='icon' /> <div>
                                    <a href="contact@xenonstack.com">contact@xenonstack.com</a></div></span>
                                <span><FmdGoodIcon className='icon' />
                                    <div>Plot Number 20, First Floor Edc Building,
                                        Rajiv Gandhi Technology Park, Mani Majra,
                                        Chandigarh - 160101, India</div>
                                </span>
                            </div>
                        </div>
                        <div className='contact-right col-md-7'>

                            <form onSubmit={handleSubmit} className='row'>
                                <div className='input-field'>
                                    <label>Name</label>
                                    <input type="text" name="name" placeholder="Full Name" onChange={formUpdate} value={contactInfo.name}></input>
                                </div>
                                <div className='input-field'>
                                    <label>Email</label>
                                    <input type="text" name="email" placeholder="Email Address" onChange={formUpdate} value={contactInfo.email} required></input>
                                </div>
                                <div className='input-field'>
                                    <label>Phone Number</label>
                                    <input type="text" name="number" placeholder="Phone Number" onChange={formUpdate} value={contactInfo.number} required></input>
                                </div>
                                <div className='input-field'>
                                    <label>Message</label>
                                    <textarea name="message" placeholder="Message" onChange={formUpdate} value={contactInfo.message} required></textarea>
                                </div>

                                <button>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Contact