package com.FitnessGroupHealthClub.GymMangementSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.FitnessGroupHealthClub.GymMangementSystem.model.Trainer;
@Repository
public interface TrainerRepository extends JpaRepository<Trainer,Long>{

}
