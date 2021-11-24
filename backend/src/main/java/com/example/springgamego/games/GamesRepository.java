package com.example.springgamego.games;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;


public interface GamesRepository extends JpaRepository<Games, Long>{
    Games findByID(Long ID);

    // https://springframework.guru/spring-data-jpa-query/
    // Have 20 games per page
    // @Query("SELECT * FROM Games LIMIT ?1*20 , ?1")
    // Optional<Games> getSomeGames(int page);


}
