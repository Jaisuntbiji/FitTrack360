package com.FitnessGroupHealthClub.GymMangementSystem.controller;

import com.FitnessGroupHealthClub.GymMangementSystem.model.User;
import com.FitnessGroupHealthClub.GymMangementSystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserController {

    @Autowired
    UserService userService;


    @PostMapping("/addUser")
    public ResponseEntity<String> addUser(@RequestBody User user){
        System.out.println(user);
        userService.addUser(user);
        return new ResponseEntity<>("Success add user", HttpStatus.OK);
    }

    @GetMapping("/getUser/{userEmail}")
    public ResponseEntity<User> getUser(@PathVariable String userEmail){
        return new ResponseEntity<>(userService.getUser(userEmail),HttpStatus.OK);
    }

    @PutMapping("/updateUser")
    public ResponseEntity<String> updateUser(@RequestBody User user){
        User flag = userService.getUser(user.getUserEmail());
        if(flag == null){
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }else {
            userService.updateUSer(user);
            return new ResponseEntity<>("Success update user", HttpStatus.OK);
        }
    }
}
