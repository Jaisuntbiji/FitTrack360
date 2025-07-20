package com.FitnessGroupHealthClub.GymMangementSystem.controller;

import com.FitnessGroupHealthClub.GymMangementSystem.model.AddPayementRequest;
import com.FitnessGroupHealthClub.GymMangementSystem.model.Member;
import com.FitnessGroupHealthClub.GymMangementSystem.model.Payment;
import com.FitnessGroupHealthClub.GymMangementSystem.model.PaymentOverview;
import com.FitnessGroupHealthClub.GymMangementSystem.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/paymentList/{memberId}")
    public List<Payment> getPaymentList(@PathVariable Long memberId) {
        return paymentService.getPayementDetailsById(memberId);
    }

    @PostMapping("/addPayment")
    public ResponseEntity<String> addPayment(@RequestBody AddPayementRequest request) {
        paymentService.addPayement(request);
        return ResponseEntity.ok("Payment received successfully.");
    }

    @PostMapping("/markPaid/{payementId}")
    public ResponseEntity<String> markPaid(@PathVariable long payementId) {
        paymentService.markPaid(payementId);
        return ResponseEntity.ok("Mark paid successfully.");
    }
}
