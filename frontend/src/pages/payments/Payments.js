import React, { useState, useEffect } from 'react';
import './Payments.css';
import { TextField, Box, Button, Modal, Typography } from '@mui/material'
import { } from '@mui/icons-material'
import { api_host, axio_header } from '../proxy_env'
import { states } from "./var"
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import ShoppingCart from './ShoppingCart.js';

export default function Payments(props) {

  const [cost, setCost] = useState(localStorage.getItem('price') == null ? "0.00" : localStorage.getItem('price'))
  const [disbutton, setDisButton] = useState(true)
  const [modal, setModel] = useState(false)
  const [msg, setMsg] = useState("")
  const history = useHistory();

  /**
   *Form variables     
    private String firstname ;
    private String lastname ;
    private String address ;
    private String city ;
    private String state ;
    private String zip ;
    private String phone ;
    private String cardnum ;
    private String cardexpmonth ;
    private String cardexpyear ;
    private String cardcvv ;
    private String email ;
   */

  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zip, setZip] = useState("")
  const [phone, setPhone] = useState("")
  const [cardnum, setCardnum] = useState("")
  const [cardexpmonth, setCardexpmonth] = useState("")
  const [cardexpyear, setCardexpyear] = useState("")
  const [cardcvv, setCardcvv] = useState("")
  const [email, setEmail] = useState("")
  const [gameid, setGameid] = useState("")

  const [errphone, setErrphone] = useState(false)
  const [erremail, setErremail] = useState(false)
  const [errfirstname, setErrfirstname] = useState(false)
  const [errlastname, setErrlastname] = useState(false)

  const [erraddress, setErraddress] = useState(false)
  const [errcity, setErrcity] = useState(false)
  const [errstate, setErrstate] = useState(false)
  const [errzip, setErrzip] = useState(false)

  const [errcardnum, setErrcardnum] = useState("")
  const [errcardexpmonth, setErrcardexpmonth] = useState("")
  const [errcardexpyear, setErrcardexpyear] = useState("")
  const [errcardcvv, setErrcardcvv] = useState("")

  let personel_form = [
    {
      ele: firstname,
      change: (event) => {
        setFirstname(event.target.value)
        if (!valid_regx("na", event.target.value)) setErrfirstname(true)
        else setErrfirstname(false)
      },
      label: 'First Name',
      helperText: null,
      error: errfirstname,
    },
    {
      ele: lastname,
      change: (event) => {
        setLastname(event.target.value)
        if (!valid_regx("na", event.target.value)) setErrlastname(true)
        else setErrlastname(false)
      },
      label: 'Last Name',
      helperText: null,
      error: errlastname,
    },
    {
      ele: phone,
      change: (event) => {
        setPhone(event.target.value)
        if (!valid_regx("phone", event.target.value)) setErrphone(true)
        else setErrphone(false)
      },
      label: 'Phone',
      helperText: "(###) ###-####",
      error: errphone,
    },
    {
      ele: email,
      change: (event) => {
        setEmail(event.target.value)
        if (!valid_regx("email", event.target.value)) setErremail(true)
        else setErremail(false)
      },
      label: 'Email',
      helperText: "txt@gg.com",
      error: erremail,
    }
  ]

  let address_form = [
    {
      ele: address,
      change: (event) => {
        setAddress(event.target.value)
        if (!valid_regx("na", event.target.value)) setErraddress(true)
        else setErraddress(false)
      },
      label: 'Address',
      helperText: null,
      error: erraddress,
    },
    {
      ele: city,
      change: (event) => {
        setCity(event.target.value)
        if (!valid_regx("na", event.target.value)) setErrcity(true)
        else setErrcity(false)
      },
      label: 'City',
      helperText: null,
      error: errcity,
    },
    {
      ele: state,
      change: (event) => {
        setState(event.target.value)
        if (!valid_regx("state", event.target.value)) setErrstate(true)
        else setErrstate(false)
      },
      label: 'State',
      helperText: "CA",
      error: errstate,
    },
    {
      ele: zip,
      change: (event) => {
        setZip(event.target.value)
        if (!valid_regx("zip", event.target.value)) setErrzip(true)
        else setErrzip(false)
      },
      label: 'Zip',
      helperText: "#####",
      error: errzip,
    }
  ]

  let card_form = [
    {
      ele: cardnum,
      change: (event) => {
        setCardnum(event.target.value)
        if (!valid_regx("cardnum", event.target.value)) setErrcardnum(true)
        else setErrcardnum(false)
      },
      label: 'Card Number',
      helperText: "1111-2222-3333-4444",
      error: errcardnum,
    },
    {
      ele: cardexpmonth,
      change: (event) => {
        setCardexpmonth(event.target.value)
        if (!valid_regx("month", event.target.value)) setErrcardexpmonth(true)
        else setErrcardexpmonth(false)
      },
      label: 'Exp Month',
      helperText: "01",
      error: errcardexpmonth,
    },
    {
      ele: cardexpyear,
      change: (event) => {
        setCardexpyear(event.target.value)
        if (!valid_regx("year", event.target.value)) setErrcardexpyear(true)
        else setErrcardexpyear(false)
      },
      label: 'Exp Year',
      helperText: null,
      error: errcardexpyear,
    },
    {
      ele: cardcvv,
      change: (event) => {
        setCardcvv(event.target.value)
        if (!valid_regx("cvv", event.target.value)) setErrcardcvv(true)
        else setErrcardcvv(false)
      },
      label: 'CVV',
      helperText: "###",
      error: errcardcvv,
    }
  ]

  function valid_regx(type, txt) {
    if (type == "email") {
      let valid = new RegExp(
        '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
      );
      return valid.test(txt)
    }
    else if (type == "phone") {
      let valid = new RegExp(
        '^[(0-9)]{5}[ ][0-9]{3}[-][0-9]{4}$'
      );
      return valid.test(txt)
    }
    else if (type == "zip") {
      let valid = new RegExp(
        '^[0-9]{5}$'
      );
      return valid.test(txt)
    }
    else if (type == "state") {
      return states.includes(txt);
    }
    else if (type == "month") {
      return 0 < parseInt(txt) && parseInt(txt) < 13 && txt.length == 2
    }
    else if (type == "year") {
      let valid = new RegExp(
        '^[0-9]{4}$'
      );
      return valid.test(txt)
    }
    else if (type == "cvv") {
      let valid = new RegExp(
        '^[0-9]{3}$'
      );
      return valid.test(txt)
    }
    else if (type == "cardnum") {
      let valid = new RegExp(
        '^[(0-9)-]{19}$'
      );
      return valid.test(txt) && 0 < parseInt(txt[0]) && parseInt(txt[0]) < 7
    }
    else {
      if (!txt || txt.trim() == '') return false
      return true
    }
  }

  function canPay() {
    if (!errphone && !erremail && !errfirstname && !errlastname && !erraddress && !errcity && !errstate && !errzip
      && !errcardnum && !errcardexpmonth && !errcardexpyear && !errcardcvv && phone.length > 0 && email.length > 0 && firstname.length > 0 &&
      lastname.length > 0 && address.length > 0 && city.length > 0 && state.length > 0 && zip.length > 0
      && cardnum.length > 0 && cardexpmonth.length > 0 && cardexpyear.length > 0 && cardcvv.length > 0) {
      setDisButton(false)
      return true
    }
    else {
      setDisButton(true)
      return false
    }
  }

  useEffect(() => {
    canPay()
  })

  async function payProcess() {
    if (canPay()) {
      const variable = {
        phone, email, firstname,
        lastname, address, city, state, zip, cardnum, cardexpmonth, cardexpyear, cardcvv,
        amount: cost, gameid: localStorage.getItem('gameid')
      }
      // make payment
      await axios.post(api_host + '/payments/pay', variable, axio_header).then(response => {
        if (response.data.err == '0') {
          setMsg("")
          setModel(true)
        }
        else {
          setModel(false)
          setMsg("Invalid card, please try a different card")
        }
      })

    }
  }

  return (
    <div className='Payments'>

      <ShoppingCart/>
      
      <p id="payment-error-msg" >{msg? msg:""}</p>

      <Box
        m={5} pt={3}
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 3, width: '20vw' },
        }}
        noValidate
        autoComplete="off"
      >

        <h1>Complete Your Purchase</h1>

        <h3>Personal Info</h3>

        <div>
          {personel_form.map((element, ind) => {
            return <TextField key={ind} error={element.error} label={element.label} helperText={element.helperText ? "Required: " + element.helperText : "Required"} onChange={element.change} />
          })}
        </div>

        <h3>Location Info</h3>

        <div>
          {address_form.map((element, ind) => {
            return <TextField key={ind} error={element.error} label={element.label} helperText={element.helperText ? "Required: " + element.helperText : "Required"} onChange={element.change} />
          })}
        </div>

        <h3>Card Info</h3>

        <div>
          {card_form.map((element, ind) => {
            return <TextField key={ind} error={element.error} label={element.label} helperText={element.helperText ? "Required: " + element.helperText : "Required"} onChange={element.change} />
          })}
        </div>

        <Button disabled={disbutton} style={{ float: "right", marginRight: "20vw" }} variant="contained" onClick={() => { payProcess() }}>Pay Now!</Button>

      </Box>

      <Modal
        open={modal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        id="payments-modal"
      >
        <Box id="payments-modal-box">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Success Paying
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Thank you for Shopping!
          </Typography>
          <Button id="payments-modal-button" variant="contained" onClick={() => { history.push("/"); }}>Done</Button>
        </Box>
      </Modal>
    </div>
  );
}
