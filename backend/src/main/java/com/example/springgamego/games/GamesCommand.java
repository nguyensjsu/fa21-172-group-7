package com.example.springgamego.games;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
class GamesCommand {

    private String action ;
    private String name ;
    private String description ;
    private String price ;
    
}
