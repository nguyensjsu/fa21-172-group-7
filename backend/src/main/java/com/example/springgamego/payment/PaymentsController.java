package com.example.springgamego.payment;

import javax.validation.Valid;

import com.example.springgamego.cyber.AuthRequest;
import com.example.springgamego.cyber.AuthResponse;
import com.example.springgamego.cyber.CaptureRequest;
import com.example.springgamego.cyber.CaptureResponse;
import com.example.springgamego.cyber.CyberSourceAPI;

import javax.servlet.http.HttpServletRequest;
import java.net.InetAddress;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;

import java.util.regex.*;


@Slf4j
@Controller
@RequestMapping("/")
public class PaymentsController {  

    Pattern p = Pattern.compile("([(][0-9][0-9][0-9][)][ ][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9])|([0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9])|([0-9][0-9][0-9][0-9][0-9])|([A-Z][A-Z])");

    private final PaymentsRepository repository;

    @Value("${cybersource.apihost}") private String apiHost ;
    @Value("${cybersource.merchantkeyid}") private String merchantKeyId ;
    @Value("${cybersource.merchantsecretkey}") private String merchantsecretKey ;
    @Value("${cybersource.merchantid}") private String merchantId ;

    PaymentsController(PaymentsRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public String getAction( @ModelAttribute("command") PaymentsCommand command, 
                            Model model ) {

        //Host name
        String host_name="";
        try { 
            InetAddress ip = InetAddress.getLocalHost() ;
            host_name = ip.getHostName() ;

        } catch (Exception e) { }
  
        /* Render View */
        model.addAttribute( "message", host_name ) ;

        return "creditcards" ;

    }

    @PostMapping
    public String postAction(@Valid @ModelAttribute("command") PaymentsCommand command,  
                            @RequestParam(value="action", required=true) String action,
                            Errors errors, Model model, HttpServletRequest request) {
    
        log.info( "Action: " + action ) ;
        log.info( "Command: " + command ) ;
        log.info( "Model: " + model ) ;
        log.info( "Request: " + request ) ;

        CyberSourceAPI api = new CyberSourceAPI() ;
		CyberSourceAPI.setHost( apiHost ) ;
		CyberSourceAPI.setKey( merchantKeyId ) ;
		CyberSourceAPI.setSecret(merchantsecretKey ) ;
		CyberSourceAPI.setMerchant( merchantId ) ;


        String message = "";

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
        String note = command.getNotes();

        State states = new State();
        state = state.toUpperCase();
        
        Boolean missing = false;
        if (firstname.equals("")){
            message += "firstname Required.\n";
            missing=true;
        }
        if (lastname.equals("")){
            message += "lastname Required.\n";
            missing=true;
        }
        if (address.equals("")){
            message += "address Required.\n";
            missing=true;
        }
        if (city.equals("")){
            message += "city Required.\n";
            missing=true;
        }
        if (state.equals("") || states.CheckState(state)){
            message += "state Required.\n";
            missing=true;
        }
        if (zip.equals("") || !p.matcher(zip).matches()){
            message += "Invalid zip.\n";
            missing=true;
        }
        if (phone.equals("") || !p.matcher(phone).matches()){
            message += "phone Required.\n";
            missing=true;
        }
        if (cardnum.equals("") || !p.matcher(cardnum).matches()){
            message += "Invalid cardnum.\n";
            missing=true;
        }
        if (cardexpmonth.equals("") || states.convertMonth(cardexpmonth).equals("na")){
            message += "Invalid cardexpmonth.\n";
            missing=true;
        }
        if (cardexpyear.equals("") || cardexpyear.length()!=4){
            message += "Invalid cardexpyear.\n";
            missing=true;
        }
        if (cardcvv.equals("")  || cardcvv.length()!=3){
            message += "Invalid cardcvv.\n";
            missing=true;
        }
        if (email.equals("")){
            message += "email Required.\n";
            missing=true;
        }
        if (note.equals("")){
            message += "note Required.\n";
            missing=true;
        }
        int cardTypeNum=0;
        try {
            cardTypeNum = Integer.parseInt(cardcvv.charAt(0)+"");
        }
        catch (Exception x){}
        String cardType="";
        if (cardTypeNum<1 || cardTypeNum>6) {
            message += "Not supported card type.\n";
            missing=true;
        }
        else{
            cardType="00"+cardTypeNum;
        }

        if (missing == true){
            System.out.println(message);
            model.addAttribute( "message", message ) ;
            return "creditcards";
        }
        

        
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
        payment.setNotes(command.getNotes());
        try{

            int orderNum = (int)(Math.random() * 999999 + 1);
            
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
            auth.transactionAmount = "9.99" ;
            auth.transactionCurrency = "USD" ;
            auth.cardNumnber = cardnum ;
            auth.cardExpMonth = states.convertMonth(cardexpmonth).toString();
            auth.cardExpYear = cardexpyear ;
            auth.cardCVV = cardcvv ;
            auth.cardType = cardType ;

            AuthResponse authResponse = new AuthResponse() ;
            System.out.println("\n\nAuth Request: " + auth.toJson() ) ;
            authResponse = api.authorize(auth) ;
            System.out.println("\n\nAuth Response: " + authResponse.toJson() ) ;
            if ( authResponse.status.equals("AUTHORIZED") ) {

                CaptureRequest capture = new CaptureRequest() ;
		        CaptureResponse captureResponse = new CaptureResponse() ;
                capture.reference = "Order Number: " + orderNum;
                capture.paymentId = authResponse.id ;
                capture.transactionAmount = "9.99" ;
                capture.transactionCurrency = "USD" ;
                captureResponse = api.capture(capture) ;
                System.out.println("\n\nCapture Response: " + captureResponse.toJson() ) ;

                payment.setAuthID(authResponse.id);
                payment.setCaptureID(authResponse.id);
                payment.setCaptureStatus(authResponse.status);
                payment.setAuthStatus(captureResponse.status);
                payment.setAmount("9.99");
                payment.setCurrency("USD");

                repository.save(payment);
                model.addAttribute( "message", "Thank you for you payment. Payment Number: "+ orderNum) ;
                return "creditcards";
            }
            else {
                model.addAttribute( "message", "Invalid Card Info") ;
                return "creditcards";
            }
        }
        catch (Exception e){
            model.addAttribute( "message", "There is an error, please try again") ;
            return "creditcards";
        }
    }
}
