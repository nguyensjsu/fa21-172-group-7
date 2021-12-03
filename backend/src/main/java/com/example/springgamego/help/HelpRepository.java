package com.example.springgamego.help;

import org.springframework.data.jpa.repository.JpaRepository;

public interface HelpRepository extends JpaRepository<Help, Long>{
  void deleteById(long id);
}
