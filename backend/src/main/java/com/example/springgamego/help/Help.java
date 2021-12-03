package com.example.springgamego.help;

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
public class Help {
    @Column(nullable=false) @Id @GeneratedValue private long ID;
    @Column(nullable=false) private String name;
    @Column(nullable=false) private String email;
    @Column(nullable=false) private String message;
}
