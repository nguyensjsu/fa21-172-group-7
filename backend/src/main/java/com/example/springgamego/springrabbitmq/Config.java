package com.example.springgamego.rabbitmq;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

@Configuration
public class Config {
    private RabbitTemplate template;
    
    @Bean
    public Queue help() {
        return new Queue("help");
    }

    private static class ReceiverConfig {

        @Bean
        public Receiver receiver1() {
            return new Receiver(1);
        }

        @Bean
        public Receiver receiver2() {
            return new Receiver(2);
        }
    }

    @Bean
    public Sender sender(RabbitTemplate template) {
        return new Sender(template);
    }
}
