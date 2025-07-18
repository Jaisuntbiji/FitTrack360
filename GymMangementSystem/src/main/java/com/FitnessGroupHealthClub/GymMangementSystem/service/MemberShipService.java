package com.FitnessGroupHealthClub.GymMangementSystem.service;

import com.FitnessGroupHealthClub.GymMangementSystem.model.MemberShip;
import com.FitnessGroupHealthClub.GymMangementSystem.repository.MemberShipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberShipService {

    @Autowired
    private MemberShipRepository memberShipRepository;


    public void updateMemberShip(List<MemberShip> memberShip){
        for (MemberShip membership : memberShip) {
            memberShipRepository.save(membership);
        }
    }

    public List<MemberShip> getMembership() {
        return memberShipRepository.findAll();
    }
}
