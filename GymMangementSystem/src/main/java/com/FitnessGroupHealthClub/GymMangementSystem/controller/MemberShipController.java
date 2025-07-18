package com.FitnessGroupHealthClub.GymMangementSystem.controller;

import com.FitnessGroupHealthClub.GymMangementSystem.model.MemberShip;
import com.FitnessGroupHealthClub.GymMangementSystem.service.MemberShipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class MemberShipController {

    @Autowired
    private MemberShipService memberShipService;

    @PutMapping("/addMemberShip")
    public ResponseEntity<String> addMemberShip(@RequestBody List<MemberShip> memberShip) {
        System.out.println(memberShip);
        memberShipService.updateMemberShip(memberShip);
        return new  ResponseEntity<>("Member Ship updated Successfully", HttpStatus.OK);
    }

    @GetMapping("/getMemberShip")
    public List<MemberShip> getMemberShip() {
        return memberShipService.getMembership();
    }
}
