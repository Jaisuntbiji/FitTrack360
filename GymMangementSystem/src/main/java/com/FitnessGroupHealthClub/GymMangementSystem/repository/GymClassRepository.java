package com.FitnessGroupHealthClub.GymMangementSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.FitnessGroupHealthClub.GymMangementSystem.model.GymClass;
@Repository
public interface GymClassRepository extends JpaRepository<GymClass,Long>{

}
