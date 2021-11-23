package com.example.springgamego.accounts;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;


public interface AccountRepository extends JpaRepository<Games, Account>{
	
    Account findByID(Long ID);

}
