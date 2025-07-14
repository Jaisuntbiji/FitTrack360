package com.FitnessGroupHealthClub.GymMangementSystem.service;

import com.FitnessGroupHealthClub.GymMangementSystem.model.Trainer;
import com.FitnessGroupHealthClub.GymMangementSystem.repository.MemberRepository;
import com.FitnessGroupHealthClub.GymMangementSystem.repository.TrainerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrianerService {

    @Autowired
    TrainerRepository trainerRepository;

    public List<Trainer> getAllTrainer() {
        return trainerRepository.findAll();
    }

    public void addMember(Trainer trainer) {
        trainerRepository.save(trainer);
    }

    public Trainer getTrainerById(Trainer trainer) {
        try{
            return trainerRepository.findById(trainer.getTrainerId()).get();
        }catch (Exception e){
            return null;
        }
    }

    public Trainer getTrainerById(String trainerId) {
        return trainerRepository.findById(Long.parseLong(trainerId)).get();
    }

    public void updateTrainer(Trainer trainer) {
        trainerRepository.save(trainer);
    }

    public void deleteTrainer(String  trainerId) {
        trainerRepository.deleteById(Long.parseLong(trainerId));
    }
}
