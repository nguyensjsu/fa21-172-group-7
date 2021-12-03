package com.example.springgamego.rabbitmq;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import java.util.concurrent.atomic.AtomicInteger;

public class Sender {

    @Autowired
    private RabbitTemplate template;

    @Autowired
    private Queue queue;

    @Autowired
    public Sender(RabbitTemplate template) {
        this.template = template;
    }

    public void send(String message) {
        template.convertAndSend(queue.getName(), message);
        System.out.println(queue);
    }
}

