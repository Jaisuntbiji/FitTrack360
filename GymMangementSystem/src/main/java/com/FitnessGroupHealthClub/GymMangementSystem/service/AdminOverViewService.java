package com.FitnessGroupHealthClub.GymMangementSystem.service;

import com.FitnessGroupHealthClub.GymMangementSystem.model.AdminOverView;
import com.FitnessGroupHealthClub.GymMangementSystem.model.Payment;
import com.FitnessGroupHealthClub.GymMangementSystem.model.Trainer;
import com.FitnessGroupHealthClub.GymMangementSystem.repository.MemberRepository;
import com.FitnessGroupHealthClub.GymMangementSystem.repository.PaymentRepository;
import com.FitnessGroupHealthClub.GymMangementSystem.repository.TrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class AdminOverViewService {

    @Autowired
    MemberRepository memberRepository;
    @Autowired
    TrainerRepository trainerRepository;
    @Autowired
    PaymentRepository paymentRepository;
    @Autowired
    AdminOverView adminOverView;


    public AdminOverView overView() {

        List<Trainer> trainers = trainerRepository.findAll();
        List<Payment> payments = paymentRepository.findAll();
        int totalActiveTrainers = 0;
        int mouthlyRevenue = 0;
        Date date = new Date();
        @Deprecated
        long month = date.getMonth();
        @Deprecated
        long year = date.getYear();
        for(Trainer trainer : trainers) {
            if(trainer.getTrainerStatus().equals("active")) {
                totalActiveTrainers++;
            }
        }

        for(Payment payment : payments) {
            if(payment.getPayment_paidDate().getMonth() == month && payment.getPayment_paidDate().getYear() == year) {
                mouthlyRevenue += payment.getPayment_amount();
            }
        }

        adminOverView.setTotalMembers(trainerRepository.findAll().size()+1);
        adminOverView.setActiveTrainers(totalActiveTrainers);
        adminOverView.setTotalClass(0);
        adminOverView.setMonthlyRevenue(mouthlyRevenue);

        return adminOverView;
    }
}
