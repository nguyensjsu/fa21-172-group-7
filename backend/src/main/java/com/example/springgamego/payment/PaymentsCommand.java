package com.example.springgamego.payment;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
class PaymentsCommand {

    private String action ;
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

    private String amount ;
    
}
