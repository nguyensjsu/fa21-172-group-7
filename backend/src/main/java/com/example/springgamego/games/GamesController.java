package com.example.springgamego.games;


import java.util.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;


import com.example.springgamego.cyber.*;

import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.ResponseBody;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class GamesController {

    private final GamesRepository repository;

    GamesController(GamesRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/games")
    @CrossOrigin(origins = "*")
    public List<Games> getGames(@Valid @ModelAttribute("command") GamesCommand command, Model model, HttpServletRequest request) 
    {

        log.info( "Model: " + model ) ;
        log.info( "Request: " + request ) ;
        log.info( "Command: " + command ) ;
        
        if(repository.findAll().size() == 0)
        {
            log.info("CAN'T FIND GAMES, SO ADDING SOME");
            Games game1 = new Games();
            game1.setName( "Kingdom Hearts ");
            game1.setDescription( "Fighting RPG" );
            game1.setPrice( "30" );
            game1.setInventoryCount( "5" );

            Games game2 = new Games();
            game2.setName( "Kingdom Hearts 2");
            game2.setDescription( "Fighting RPG Second Game" );
            game2.setPrice( "40" );
            game2.setInventoryCount( "5" );

            repository.save(game1);
            repository.save(game2);
        }

        List<Games> gamesList = repository.findAll();

        return gamesList;
    }


    // get only available games
    @GetMapping("/games/available")
    @CrossOrigin(origins = "*")
    public List<Games> getAvailableGames(@Valid @ModelAttribute("command") GamesCommand command, Model model, HttpServletRequest request) 
    {

        log.info( "Model: " + model ) ;
        log.info( "Request: " + request ) ;
        log.info( "Command: " + command ) ;
        
        if(repository.findAll().size() == 0)
        {
            log.info("CAN'T FIND GAMES, SO ADDING SOME");
            Games game1 = new Games();
            game1.setName( "Kingdom Hearts ");
            game1.setDescription( "Fighting RPG" );
            game1.setPrice( "30" );
            game1.setInventoryCount( "0" );

            Games game2 = new Games();
            game2.setName( "Kingdom Hearts 2");
            game2.setDescription( "Fighting RPG Second Game" );
            game2.setPrice( "40" );
            game2.setInventoryCount( "5" );

            repository.save(game1);
            repository.save(game2);
        }

        List<Games> gamesList = (List) repository.findAvailableGames();

        return gamesList;
    }

}

