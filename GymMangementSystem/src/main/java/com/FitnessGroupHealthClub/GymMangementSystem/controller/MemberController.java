package com.FitnessGroupHealthClub.GymMangementSystem.controller;

import com.FitnessGroupHealthClub.GymMangementSystem.model.Member;
import com.FitnessGroupHealthClub.GymMangementSystem.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class MemberController {

    @Autowired
    MemberService memberService;


    @PostMapping("/addMember")
    public ResponseEntity<String> addMember(@RequestBody Member member) {
         memberService.addMember(member);
         return new ResponseEntity<>("Member added sucessfully", HttpStatus.OK);
    }

    @GetMapping("/viewMember")
    public List<Member> viewMember() {
        return memberService.getMembers();
    }

    @DeleteMapping("/deleteMember/{memberId}")
    public ResponseEntity<String> deleteMember(@PathVariable String memberId) {
        Member member = memberService.getMemberById(Long.parseLong(memberId));
        if(member != null){
            memberService.deleteMember(memberId);
            return new ResponseEntity<>("Member has been deleted", HttpStatus.OK);
        }else {
            return new ResponseEntity<>("Member not found",HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/updateMember")
    public ResponseEntity<String> updateMember(@RequestBody Member member){
        Member memberFlag = memberService.getMemberById(member.getMemberId());
        if(memberFlag != null){
            memberService.updateMember(member);
            return new ResponseEntity<>("Member has been updated", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Member not found",HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getMember/{memberId}")
    public Member getMember(@PathVariable String memberId) {
        return memberService.getMemberById(Long.parseLong(memberId));
    }

    @GetMapping("/getMemberByEmail/{email}")
    public Member getMemberByEmail(@PathVariable String email) {
        System.out.println(email);
        return memberService.getMemberByEmail(email);
    }

    @GetMapping("/checkExpiedMember")
    public int checkExpiedMember() {
        return memberService.getExpiedMember();
    }

}
