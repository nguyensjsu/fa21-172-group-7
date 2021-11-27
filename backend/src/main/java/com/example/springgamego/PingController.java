package com.example.springgamego;


import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
/* See: https://spring.io/guides/gs/rest-service/ */

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class PingController {

    //Sample ping class, you can use any other class like "Payment"
    class Ping {
        private String test;

        public Ping(String msg) {
            this.test = msg;
        }

        public String getTest() {
            return this.test;
        }
    }

    @GetMapping("/ping")
    @CrossOrigin(origins = "*")
    public Ping ping() {
        return new Ping("Backend API alive!");
    }

    // Json Test response
    @PostMapping("/ping/test")
    @CrossOrigin(origins = "*")
    Map<String, String> testPost(@Valid @RequestBody TestCommand command, Errors errors, Model model, HttpServletRequest request) {
        
        log.info( "Model: " + model ) ;
        log.info( "Request: " + request ) ;
        log.info( "Command: " + command ) ;

        HashMap<String, String> map = new HashMap<>();

        map.put("Message", "This is a Json response");
        map.put("firstName", "Bob");
        map.put("lastName", "Josh");
        map.put("title", command.getTitle());

        return map;
    }
}

