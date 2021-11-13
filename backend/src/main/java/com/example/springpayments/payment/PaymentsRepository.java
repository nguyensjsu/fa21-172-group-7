package com.example.springpayments.payment;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentsRepository extends JpaRepository<Payments, Long>{
    Payments findByID(Long ID);
}
