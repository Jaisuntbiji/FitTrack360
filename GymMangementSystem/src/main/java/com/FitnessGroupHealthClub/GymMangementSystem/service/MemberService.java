package com.FitnessGroupHealthClub.GymMangementSystem.service;

import com.FitnessGroupHealthClub.GymMangementSystem.model.Member;
import com.FitnessGroupHealthClub.GymMangementSystem.repository.MemberRepository;
import com.FitnessGroupHealthClub.GymMangementSystem.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Date;
import java.util.List;

import static com.FitnessGroupHealthClub.GymMangementSystem.service.SHA256Hasher.getSHA256Hash;


@Service
public class MemberService {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    PaymentRepository  paymentRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    PaymentService paymentService;
    @Scheduled(fixedRate = 86400000)
    public void dateChecker (){
        List<Member> memberList = memberRepository.findAll();
        for (Member member : memberList) {
            if(member.getExpiryDate().before(new Date(System.currentTimeMillis()))){
                member.setStatus("expired");
                memberRepository.save(member);
            }
        }
    }

    public boolean addMember(Member member, MultipartFile file) {
        try {
            if (file != null) {
                String filePath = saveImage(file);
                member.setImagePath(filePath);
            }
            memberRepository.save(member);
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
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
        int total = 0;
        for (Member member : members) {
            if(member.getStatus().equals("expired")){
                total++;
            }
        }
            return total;
    }

    public boolean emailCheck(String userEmail) {
        Member member = memberRepository.findBymemberEmail(userEmail);
        if(member == null){
            return true;
        }else {
            return false;
        }
    }

    private String saveImage(MultipartFile file) throws IOException {
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String fileName = file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return filePath.toString();
    }
    public String getImageFilePathByEmail(String email) {
        Member member = memberRepository.findBymemberEmail(email);
        if (member != null && member.getImagePath() != null) {
            Path path = Paths.get(member.getImagePath());
            if (Files.exists(path)) {
                return member.getImagePath();
            }
        }
        return null;
    }
}
