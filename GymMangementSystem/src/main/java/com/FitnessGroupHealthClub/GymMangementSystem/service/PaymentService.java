package com.FitnessGroupHealthClub.GymMangementSystem.service;

import com.FitnessGroupHealthClub.GymMangementSystem.model.*;
import com.FitnessGroupHealthClub.GymMangementSystem.repository.MemberRepository;
import com.FitnessGroupHealthClub.GymMangementSystem.repository.MemberShipRepository;
import com.FitnessGroupHealthClub.GymMangementSystem.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class PaymentService {
    Date date = new Date();
    @Autowired
    PaymentRepository paymentRepository;

    @Autowired
    Payment payment;

    @Autowired
    PaymentOverview paymentOverview;

    @Autowired
    MemberShipRepository memberShipRepository;

@Autowired
MemberRepository memberRepository;


    public boolean addPayement(AddPayementRequest request) {
        Member member = memberRepository.findById(Long.parseLong(request.getMemberId())).orElse(null);
        if(member.getStatus().equals("Pending")||member.getStatus().equals("expired")){
            member.setStatus("active");
            member.setExpiryDate(request.getPaymentDueDate());
       }
        payment.setMemberId(Long.parseLong(request.getMemberId()));
        payment.setPayment_amount(request.getPaymentAmount());
        payment.setPayment_dueDate(request.getPaymentDueDate());
        payment.setPayment_status(request.getPaymentStatus());
        payment.setPayment_type(request.getPaymentType());
        payment.setPayment_paidDate(new Date());
        paymentRepository.save(payment);
        return true;
    }

    public PaymentOverview getPayementOverview() {
        List<Payment> payments = paymentRepository.findAll();
        int totalAmount = 0;
        int totalAmountPaid = 0;
        for(Payment payment : payments){
            totalAmount += payment.getPayment_amount();
            if(payment.getPayment_status().equals("paid")){
                totalAmountPaid += payment.getPayment_amount();
            }
        }
        paymentOverview.setAmountRecivied(totalAmountPaid);
        paymentOverview.setPadingPayment(totalAmount-totalAmountPaid);
        return paymentOverview;
    }

    public List<Payment> getPayementList() {
        return paymentRepository.findAll();
    }

    public List<Payment> getPayementDetailsById(Long memberId) {
        return paymentRepository.findAllByMemberId(memberId);
    }

    public  Payment getPaymentById(Long paymentId) {
        return paymentRepository.findById(paymentId).get();
    }

    public void markPaid(long payementId) {
        Payment payment = paymentRepository.findById(payementId).get();
        payment.setPayment_status("paid");
        paymentRepository.save(payment);

    }
}
