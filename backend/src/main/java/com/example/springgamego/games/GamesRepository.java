package com.example.springgamego.games;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.*;


public interface GamesRepository extends JpaRepository<Games, Long>{
    Games findByID(Long ID);

    // https://springframework.guru/spring-data-jpa-query/
    @Query(" SELECT g FROM Games g WHERE g.inventoryCount <> '0' ")
    Collection<Games> findAvailableGames();


}
