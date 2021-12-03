package com.example.springgamego.help;

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
import com.example.springgamego.rabbitmq.Sender;
import com.example.springgamego.rabbitmq.Receiver;

@Slf4j
@RestController
public class HelpController {
  private Sender sender;
  private Receiver receiver;
  private final HelpRepository repository;

  HelpController(HelpRepository repository, Sender sender) {
    this.repository = repository;
    this.sender = sender;
  }

  Help findByEmail(String email) {
    List<Help> Helps = repository.findAll();
    for(Help Help : Helps) {
      if(Help.getEmail().equals(email)){
        return Help;
      }
    }
    return null;
  }

  @GetMapping("/help")
  @CrossOrigin(origins = "*")
  List<Help> all(HttpServletRequest request) {
    return repository.findAll();
  }

  @PostMapping("/help/send")
  @CrossOrigin(origins = "*")
  Map<String, String> send(@Valid @RequestBody HelpCommand command, Errors errors, Model model, HttpServletRequest request) {
    log.info( "Model: " + model ) ;
    log.info( "Request: " + request ) ;
    log.info( "Command: " + command ) ;
    
    HashMap<String, String> returns = new HashMap<>();
    String info = command.getName() + ";" + command.getEmail() + ";" + command.getMessage(); 
    sender.send(info);
    returns.put("error", "false");

    return returns;
  }

  public void saveToDB(String data) {
    System.out.println("hi!!!!");
    if(data == null) {
      System.out.println("Data is null");
    } else {
      String[] split = data.split(";");
      Help help = new Help();
      help.setName(split[0]);
      help.setEmail(split[1]);
      help.setMessage(split[2]);
      repository.save(help);
    }
  }

  @PostMapping("/help/delete")
  @CrossOrigin(origins = "*")
  Map<String, String> deleteOne(@Valid @RequestBody HelpCommand command, Errors errors, Model model, HttpServletRequest request) {
    log.info( "Model: " + model ) ;
    log.info( "Request: " + request ) ;
    log.info( "Command: " + command ) ;
    
    Help help = new Help();
    System.out.println(command.getId());
    repository.deleteById(Integer.parseInt(command.getId()));
    HashMap<String, String> returns = new HashMap<>();
    returns.put("error", "false");

    return returns;  
  }
}
