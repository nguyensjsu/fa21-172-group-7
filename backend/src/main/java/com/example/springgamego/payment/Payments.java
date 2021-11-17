package com.example.springgamego.payment;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Column;
import javax.persistence.Index;
import javax.persistence.Table;
import lombok.Data;
import lombok. RequiredArgsConstructor;

@Entity
@Table(indexes=@Index (name = "altIndex", columnList = "ID", unique = true))
@Data
@RequiredArgsConstructor
class Payments {
    @Column(nullable=false) @Id @GeneratedValue private long ID;
    @Column(nullable=false) private String firstname ;
    @Column(nullable=false) private String lastname ;
    @Column(nullable=false) private String address ;
    @Column(nullable=false) private String city ;
    @Column(nullable=false) private String state ;
    @Column(nullable=false) private String zip ;
    @Column(nullable=false) private String phone ;
    @Column(nullable=false) private String cardnum ;
    @Column(nullable=false) private String cardexpmonth ;
    @Column(nullable=false) private String cardexpyear ;
    @Column(nullable=false) private String cardcvv ;
    @Column(nullable=false) private String email ;
    @Column(nullable=true) private String notes ;

    @Column(nullable=true) private String AuthID ;
    @Column(nullable=true) private String CaptureID ;
    @Column(nullable=true) private String AuthStatus ;
    @Column(nullable=true) private String CaptureStatus ;
    @Column(nullable=true) private String amount ;
    @Column(nullable=true) private String currency ;
}
