package com.FitnessGroupHealthClub.GymMangementSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.FitnessGroupHealthClub.GymMangementSystem.model.Payment;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment,Long>{
        public List<Payment> findAllByMemberId(Long memberId);
}
