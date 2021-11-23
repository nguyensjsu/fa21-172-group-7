package com.example.springgamego.accounts;


import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import com.example.springgamego.cyber.*;

import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class AccountController {

    private final AccountRepository repository;

    AccountController(AccountRepository repository) {
        this.repository = repository;
    }


    // Get all users
    // (Should be admin only ?)
    @GetMapping("/getUsers")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<Account> getGames(@Valid @ModelAttribute("command") AccountCommand command, @RequestParam(value="action", required=true) String action, Errors errors, Model model, HttpServletRequest request) {

        return repository.findAll();

    }


    // Create a user
    @PostMapping("/addUser")
    @CrossOrigin(origins = "http://localhost:3000")
    public boolean getGames(@Valid @ModelAttribute("command") AccountCommand command, @RequestParam(value="action", required=true) String action, Errors errors, Model model, HttpServletRequest request) {

        Account acct = new Account();
        acct.setUsername(command.getUsername());
        acct.setPassword(command.getPassword());
        acct.setEmail(command.getEmail());

    }


}

