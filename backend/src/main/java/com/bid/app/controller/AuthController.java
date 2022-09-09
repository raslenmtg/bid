package com.bid.app.controller;

import com.bid.app.DTO.LoginRequest;
import com.bid.app.model.User;
import com.bid.app.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;


@RestController
@RequestMapping("/api")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        return authService.authenticate(loginRequest.email,loginRequest.password);
    }

   @PostMapping("/auth/register")
    public ResponseEntity<?> registerUser(@RequestBody User signUpRequest) {
       return authService.registerUser(signUpRequest);
    }


    @PostMapping("/auth/verification")
    public ResponseEntity<?> sendVerificationCode(@RequestBody LoginRequest loginRequest) {
        return authService.sendVerificationCode(loginRequest.email);
    }

    @GetMapping("/whoami")
    public  ResponseEntity<?> whoami(){
        return authService.whoami();
    }


    @PatchMapping("/password/reset")
    public ResponseEntity<?> resetPassword(@RequestParam("password") String password) {
        return authService.resetPassword(password);
    }

    @PatchMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, String> user) {
        System.out.println(user);
        return authService.updateProfile(user);
    }
    @PatchMapping("/profile/photo")
    public ResponseEntity<?> updateProfilePicture(@RequestParam("photo") MultipartFile photo) {
        return authService.updateProfilePicture(photo);
    }



}