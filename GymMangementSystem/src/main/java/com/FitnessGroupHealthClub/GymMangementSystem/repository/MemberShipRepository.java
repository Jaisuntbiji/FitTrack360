package com.FitnessGroupHealthClub.GymMangementSystem.repository;

import com.FitnessGroupHealthClub.GymMangementSystem.model.MemberShip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberShipRepository extends JpaRepository<MemberShip,Long> {


}
