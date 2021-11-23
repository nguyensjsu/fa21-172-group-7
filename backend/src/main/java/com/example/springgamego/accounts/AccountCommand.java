package com.example.springgamego.accounts;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
class GamesCommand {

    private String action ;
    private String username ;
    private String password ;
    private String email ;
    
}
