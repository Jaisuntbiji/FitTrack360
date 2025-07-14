package com.FitnessGroupHealthClub.GymMangementSystem.controller;

import com.FitnessGroupHealthClub.GymMangementSystem.model.Trainer;
import com.FitnessGroupHealthClub.GymMangementSystem.service.TrianerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class TrainerController {

    @Autowired
    TrianerService trianerService;

    @GetMapping("/viewTrainer")
    public List<Trainer> viewTrainer(){
        return trianerService.getAllTrainer();
    }
    
    @PostMapping("/addTrainer")
    public ResponseEntity<String> addMember(@RequestBody Trainer trainer){
        System.out.println(trainer);
        trianerService.addMember(trainer);
        return new ResponseEntity<>("Member added successfully", HttpStatus.OK);
    }

    @GetMapping("/findTrainer/{trainerId}")
    public Trainer findTrainer(@PathVariable String trainerId){
        return trianerService.getTrainerById(trainerId);
    }

    @PutMapping("/updateTrainer")
    public ResponseEntity<String> updateTrainer(@RequestBody Trainer trainer){
        Trainer flag = trianerService.getTrainerById(trainer);

        if(flag != null){
            trianerService.updateTrainer(trainer);
            return new ResponseEntity<String>("Trainer updated successfully",HttpStatus.OK);
        }else {
            return new ResponseEntity<String>("Trainer not found",HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteTrainer/{trainerId}")
    public ResponseEntity<String> deleteTrainer(@PathVariable String trainerId){
        trianerService.deleteTrainer(trainerId);
        return new ResponseEntity<String>("Trainer deleted successfully",HttpStatus.OK);
    }
}
