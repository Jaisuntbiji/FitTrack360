package com.FitnessGroupHealthClub.GymMangementSystem.controller;

import com.FitnessGroupHealthClub.GymMangementSystem.model.Member;
import com.FitnessGroupHealthClub.GymMangementSystem.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class MemberController {

    @Autowired
    MemberService memberService;





    @PostMapping("/addMember")
    public ResponseEntity<String> addMember(
            @RequestPart("member") Member member,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) {
        try {
            memberService.addMember(member, file);
            return new ResponseEntity<>("Member added successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to add member: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
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

    @GetMapping("/viewImage/{email}")
    public ResponseEntity<byte[]> viewImage(@PathVariable String email) {
        try {
            String imagePath = memberService.getImageFilePathByEmail(email);

            if (imagePath == null) {
                return ResponseEntity.notFound().build();
            }

            Path path = Paths.get(imagePath);
            byte[] imageBytes = Files.readAllBytes(path);
            String contentType = Files.probeContentType(path);

            return ResponseEntity.ok()
                    .header("Content-Type", contentType)
                    .body(imageBytes);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
