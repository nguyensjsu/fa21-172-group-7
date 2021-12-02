package com.example.springgamego.user;

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
public class UserController {
  private final UserRepository repository;

  UserController(UserRepository repository) {
    this.repository = repository;
  }

  User findByEmail(String email) {
    List<User> users = repository.findAll();
    for(User user : users) {
      if(user.getEmail().equals(email)){
        return user;
      }
    }
    return null;
  }

  @GetMapping("/user")
  @CrossOrigin(origins = "*")
  List<User> all(HttpServletRequest request) {
    return repository.findAll();
  }

  @PostMapping("/user/register")
  @CrossOrigin(origins = "*")
  Map<String, String> register(@Valid @RequestBody UserCommand command, Errors errors, Model model, HttpServletRequest request) {
    log.info( "Model: " + model ) ;
    log.info( "Request: " + request ) ;
    log.info( "Command: " + command ) ;
    
    HashMap<String, String> returns = new HashMap<>();
    if(findByEmail(command.getEmail()) != null){
      returns.put("error", "true");
      returns.put("msg", "email exists");
      return returns;
    }
    User user = new User();
    user.setEmail(command.getEmail());
    user.setPassword(command.getPassword());
    user.setAttempts(0);
    repository.save(user);
    returns.put("error", "false");

    return returns;
  }

  @PostMapping("/user/login")
  @CrossOrigin(origins = "*")
  Map<String, String> login(@Valid @RequestBody UserCommand command, Errors errors, Model model, HttpServletRequest request) {
    log.info( "Model: " + model ) ;
    log.info( "Request: " + request ) ;
    log.info( "Command: " + command ) ;
    
    HashMap<String, String> returns = new HashMap<>();
    User user = findByEmail(command.getEmail());
    if(user == null) {
      returns.put("error", "true");
      return returns;
    }
    repository.save(user);
    returns.put("password", user.getPassword());
    returns.put("attempts", String.valueOf(user.getAttempts()));
    returns.put("error", "false");

    return returns;
  }

  @PostMapping("/user/login/increment")
  @CrossOrigin(origins = "*")
  Map<String, String> increment(@Valid @RequestBody UserCommand command, Errors errors, Model model, HttpServletRequest request) {
    log.info( "Model: " + model ) ;
    log.info( "Request: " + request ) ;
    log.info( "Command: " + command ) ;
    
    HashMap<String, String> returns = new HashMap<>();
    User user = findByEmail(command.getEmail());
    int attempts = user.getAttempts() + 1;
    user.setAttempts(attempts);
    repository.save(user);
    returns.put("password", user.getPassword());
    returns.put("error", "false");

    return returns;
  }

  @PostMapping("/user/login/authenticateUser")
  @CrossOrigin(origins = "*")
  Map<String, String> authenticateUser(@Valid @RequestBody UserCommand command, Errors errors, Model model, HttpServletRequest request) {
    log.info( "Model: " + model ) ;
    log.info( "Request: " + request ) ;
    log.info( "Command: " + command ) ;
    
    HashMap<String, String> returns = new HashMap<>();
    User user = findByEmail(command.getEmail());
    if(user == null) {
      returns.put("error", "true");
      return returns;
    }
    user.setAttempts(0);
    user.setToken(command.getToken());
    repository.save(user);
    returns.put("error", "false");

    return returns;
  }

  @PostMapping("/user/login/unlock")
  @CrossOrigin(origins = "*")
  Map<String, String> unlock(@Valid @RequestBody UserCommand command, Errors errors, Model model, HttpServletRequest request) {
    log.info( "Model: " + model ) ;
    log.info( "Request: " + request ) ;
    log.info( "Command: " + command ) ;
    
    HashMap<String, String> returns = new HashMap<>();
    User user = findByEmail(command.getEmail());
    user.setAttempts(0);
    repository.save(user);
    returns.put("error", "false");

    return returns;
  }
}
