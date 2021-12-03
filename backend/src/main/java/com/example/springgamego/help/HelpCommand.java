package com.example.springgamego.help;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
class HelpCommand {
  private String id;
  private String name;
  private String email;
  private String message;
}
