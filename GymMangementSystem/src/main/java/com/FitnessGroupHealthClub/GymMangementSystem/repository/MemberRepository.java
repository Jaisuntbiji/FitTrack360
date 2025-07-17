package com.FitnessGroupHealthClub.GymMangementSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.FitnessGroupHealthClub.GymMangementSystem.model.Member;
@Repository
public interface MemberRepository extends JpaRepository<Member,Long> {
    public Member findBymemberEmail(String memberEmail);
}
