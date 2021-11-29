package com.example.springgamego.games;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Column;
import javax.persistence.Index;
import javax.persistence.Table;
import lombok.Data;
import lombok. RequiredArgsConstructor;

@Entity
@Table(indexes=@Index (name = "altIndex", columnList = "ID", unique = true))
@Data
@RequiredArgsConstructor
public class Games {
    @Column(nullable=false) @Id @GeneratedValue private long ID;
    @Column(nullable=false) private String name ;
    @Column(nullable=false) private String description ;
    @Column(nullable=false) private String price ;
    @Column(nullable=false) private String inventoryCount ;
}
