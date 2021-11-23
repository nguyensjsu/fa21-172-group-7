package com.example.springgamego.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>{
    User findByID(Long ID);
    User findByEmail(String email);
    User findByToken(String token);
}
