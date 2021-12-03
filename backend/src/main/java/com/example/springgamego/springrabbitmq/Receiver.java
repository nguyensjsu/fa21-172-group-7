package com.example.springgamego.rabbitmq;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.amqp.rabbit.annotation.RabbitHandler;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.util.StopWatch;
import com.example.springgamego.help.HelpController;

@RabbitListener(queues = "help")
public class Receiver {
    private final int instance;

    @Autowired
    private HelpController controller;

    public Receiver(int i) {
        this.instance = i;
    }

    @RabbitHandler
    public void receive(String in) {
        controller.saveToDB(in);
    }
}

