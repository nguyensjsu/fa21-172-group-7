package com.example.springgamego.payment;


import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import com.example.springgamego.cyber.*;

import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
/* See: https://spring.io/guides/gs/rest-service/ */

import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class PaymentsController {

    private final PaymentsRepository repository;

    @Value("${cybersource.apihost}") private String apiHost ;
    @Value("${cybersource.merchantkeyid}") private String merchantKeyId ;
    @Value("${cybersource.merchantsecretkey}") private String merchantsecretKey ;
    @Value("${cybersource.merchantid}") private String merchantId ;

    PaymentsController(PaymentsRepository repository) {
        this.repository = repository;
    }


    // Get list of payments
    @GetMapping("/payments")
    @CrossOrigin(origins = "*")
    public List<Payments> getPayments(@Valid @ModelAttribute("command") PaymentsCommand command, Model model, HttpServletRequest request) {

        log.info( "Model: " + model ) ;
        log.info( "Request: " + request ) ;
        log.info( "Command: " + command ) ;

        List<Payments> paymentsList = repository.findAll();

        return paymentsList;

    }


    // Json Test response
    @PostMapping("/payments/pay")
    @CrossOrigin(origins = "*")
    Map<String, String> testPost(@Valid @RequestBody PaymentsCommand command, Errors errors, Model model, HttpServletRequest request) {
        
        log.info( "Model: " + model ) ;
        log.info( "Request: " + request ) ;
        log.info( "Command: " + command ) ;

        CyberSourceAPI api = new CyberSourceAPI() ;
		CyberSourceAPI.setHost( apiHost ) ;
		CyberSourceAPI.setKey( merchantKeyId ) ;
		CyberSourceAPI.setSecret(merchantsecretKey ) ;
		CyberSourceAPI.setMerchant( merchantId ) ;


        String firstname = command.getFirstname();
        String lastname = command.getLastname();
        String address = command.getAddress();
        String city = command.getCity();
        String state = command.getState();
        String zip = command.getZip();
        String phone = command.getPhone();
        String cardnum = command.getCardnum();
        String cardexpmonth = command.getCardexpmonth();
        String cardexpyear = command.getCardexpyear();
        String cardcvv = command.getCardcvv();
        String email = command.getEmail();
        String cardType = cardnum.charAt(0)+"";

        if (cardType.equals("4")) cardType = "001";
        else if (cardType.equals("3")) cardType = "003";
        else if (cardType.equals("5")) cardType = "002";
        else if (cardType.equals("6")) cardType = "004";
        else cardType = "006";

        // new payment object
        Payments payment = new Payments();
        payment.setFirstname(command.getFirstname());
        payment.setLastname(command.getLastname());
        payment.setAddress(command.getAddress());
        payment.setCity(command.getCity());
        payment.setState(command.getState());
        payment.setZip(command.getZip());
        payment.setPhone(command.getPhone());
        payment.setCardnum(command.getCardnum());
        payment.setCardexpmonth(command.getCardexpmonth());
        payment.setCardexpyear(command.getCardexpyear());
        payment.setCardcvv(command.getCardcvv());
        payment.setEmail(command.getEmail());

        HashMap<String, String> returns = new HashMap<>();
        int orderNum = -9999;
        returns.put("err", "0");
        try{

            orderNum = (int)(Math.random() * 999999 + 1);
            
            AuthRequest auth = new AuthRequest() ;
            auth.reference = "Order Number: " + orderNum;
            auth.billToFirstName = firstname ;
            auth.billToLastName = lastname ;
            auth.billToAddress = address ;
            auth.billToCity = city;
            auth.billToState = state ;
            auth.billToZipCode = zip ;
            auth.billToPhone = phone ;
            auth.billToEmail = email ;
            auth.transactionAmount = command.getAmount() ;
            auth.transactionCurrency = "USD" ;
            auth.cardNumnber = cardnum ;
            auth.cardExpMonth = cardexpmonth;
            auth.cardExpYear = cardexpyear ;
            auth.cardCVV = cardcvv ;
            auth.cardType = cardType;

            AuthResponse authResponse = new AuthResponse() ;
            System.out.println("\n\nAuth Request: " + auth.toJson() ) ;
            authResponse = api.authorize(auth) ;
            System.out.println("\n\nAuth Response: " + authResponse.toJson() ) ;
            if ( authResponse.status.equals("AUTHORIZED") ) {

                CaptureRequest capture = new CaptureRequest() ;
		        CaptureResponse captureResponse = new CaptureResponse() ;
                capture.reference = "Order Number: " + orderNum;
                capture.paymentId = authResponse.id ;
                capture.transactionAmount = command.getAmount() ;
                capture.transactionCurrency = "USD" ;
                captureResponse = api.capture(capture) ;
                System.out.println("\n\nCapture Response: " + captureResponse.toJson() ) ;

                payment.setAuthID(authResponse.id);
                payment.setCaptureID(authResponse.id);
                payment.setCaptureStatus(authResponse.status);
                payment.setAuthStatus(captureResponse.status);
                payment.setAmount(command.getAmount());
                payment.setCurrency("USD");

                repository.save(payment);
                
                returns.put("Message", "Success Payment");
                returns.put("OrderNum", orderNum+"");
                return returns;
            }
            else {
                returns.put("message", "Invalid Card Info");
                returns.put("err", "1");
                return returns;
            }
        }
        catch (Exception e){
            returns.put("message", "There is an error, please try again");
            returns.put("err", "1");
            return returns;
        }
    }
}

