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
    @CrossOrigin(origins = "http://localhost:3000")
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

        HashMap<String, String> map = new HashMap<>();

        List<Games> gamesList = repository.findAll();
        for (Games game : gamesList) {

            map.put("game", game.getName());
            map.put("description", game.getDescription());
            map.put("price", game.getPrice());
            map.put("inventoryCount", game.getInventoryCount());
        }

        return gamesList;

    }

}

