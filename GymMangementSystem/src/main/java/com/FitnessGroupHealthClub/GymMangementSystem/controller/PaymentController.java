package com.FitnessGroupHealthClub.GymMangementSystem.controller;

import com.FitnessGroupHealthClub.GymMangementSystem.model.Payment;
import com.FitnessGroupHealthClub.GymMangementSystem.model.PaymentOverview;
import com.FitnessGroupHealthClub.GymMangementSystem.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class PaymentController {

    @Autowired
    PaymentService paymentService;

    @GetMapping("/paymentOverView")
    public PaymentOverview getPaymentOverview() {
        return paymentService.getPayementOverview();
    }

    @GetMapping("/listPayment")
    public List<Payment> getPayment() {
        return paymentService.getPayementList();
    }
}
