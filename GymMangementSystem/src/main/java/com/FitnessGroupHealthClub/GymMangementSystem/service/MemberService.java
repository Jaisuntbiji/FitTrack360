package com.FitnessGroupHealthClub.GymMangementSystem.service;

import com.FitnessGroupHealthClub.GymMangementSystem.model.Member;
import com.FitnessGroupHealthClub.GymMangementSystem.repository.MemberRepository;
import com.FitnessGroupHealthClub.GymMangementSystem.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Date;
import java.util.List;

import static com.FitnessGroupHealthClub.GymMangementSystem.service.SHA256Hasher.getSHA256Hash;


@Service
public class MemberService {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    PaymentRepository  paymentRepository;

    @Autowired
    PaymentService paymentService;

    public boolean addMember(Member member){
        member.setHashKey(getSHA256Hash(member.getMemberEmail()));
        memberRepository.save(member);
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

    public int getExpiedMember() {
        List<Member> members = memberRepository.findAll();
        Date date = new Date();
        int total = 0;
        for (Member member : members) {
            if(member.getStatus().equals("expired")){
                total++;
            }
        }
            return total;
    }

    public boolean emailCheck(String userEmail) {
        Member member = memberRepository.findByhashKey(getSHA256Hash(userEmail));
        if(member == null){
            return true;
        }else {
            return false;
        }
    }
}
