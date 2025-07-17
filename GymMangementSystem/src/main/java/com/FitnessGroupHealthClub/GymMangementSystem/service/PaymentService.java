package com.FitnessGroupHealthClub.GymMangementSystem.service;

import com.FitnessGroupHealthClub.GymMangementSystem.model.Member;
import com.FitnessGroupHealthClub.GymMangementSystem.model.MemberShip;
import com.FitnessGroupHealthClub.GymMangementSystem.model.Payment;
import com.FitnessGroupHealthClub.GymMangementSystem.model.PaymentOverview;
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




    public boolean addPayement(Member member) {
        if(member != null){
            List<MemberShip> memberShipes = memberShipRepository.findAll();
            payment.setMemberId(member.getMemberId());
            for(MemberShip memberShip : memberShipes){
                if(memberShip.getMembershipName().equals(member.getMemberShipType())){
                    payment.setPayment_type(memberShip.getMembershipName());
                    payment.setPayment_amount(memberShip.getMembershipAmount());
                    break;
                }
            }
            payment.setPayment_status("paid");
            payment.setPayment_paidDate(new Date());
            payment.setPayment_dueDate(new Date());
            paymentRepository.save(payment);
        }
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
}
