package com.FitnessGroupHealthClub.GymMangementSystem.service;

import com.FitnessGroupHealthClub.GymMangementSystem.model.Member;
import com.FitnessGroupHealthClub.GymMangementSystem.repository.MemberRepository;
import com.FitnessGroupHealthClub.GymMangementSystem.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;


@Service
public class MemberService {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    PaymentRepository  paymentRepository;

    @Autowired
    PaymentService paymentService;

    public boolean addMember(Member member){
        memberRepository.save(member);
        paymentService.addPayement(member);
        return true;
    }

    public List<Member> getMembers(){
        return memberRepository.findAll();
    }

    public void deleteMember(String memberId){
        memberRepository.deleteById(Long.parseLong(memberId));
    }

    public Member getMemberById(long memberId){
        return memberRepository.findById(memberId).get();
    }

    public void updateMember(Member member) {
        memberRepository.save(member);
    }

    public Member getMemberByEmail(String email){
        return  memberRepository.findBymemberEmail(email);
    }
}
