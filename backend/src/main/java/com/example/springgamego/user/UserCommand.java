package com.example.springgamego.user;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
class UserCommand {
  private String email;
  private String password;
  private String token;
}
