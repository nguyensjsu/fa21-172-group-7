package com.example.springgamego.games;


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
public class GamesController {

    private final GamesRepository repository;

    GamesController(GamesRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/games")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<Games> getGames(@Valid @ModelAttribute("command") GamesCommand command, @RequestParam(value="action", required=true) String action, Errors errors, Model model, HttpServletRequest request) {
        
        if(repository.findAll().size() == 0)
        {
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
        }

        return repository.findAll();

    }

}

