package com.bid.app.service;


import com.bid.app.model.User;
import com.bid.app.repository.UserRepository;
import com.bid.app.security.JwtTokenUtil;
import com.bid.app.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.transaction.Transactional;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Service
@Transactional
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final JwtTokenUtil jwtUtil;
    private final JedisConnectionFactory redisConnection;
    @Value("${media.url}")
    private String mediaUrl;

    public AuthService(AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, UserRepository userRepository, JwtTokenUtil jwtUtil, RedisTemplate redisTemplate, JedisConnectionFactory redisConnectionFactory) {
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.redisConnection = redisConnectionFactory;
    }

    public User getAuthenticatedUser() {
        User userprincipal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<User> user = userRepository.findById(userprincipal.getId());
        if (user.isEmpty()) {
            throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "User not found");
        }
        return user.get();
    }

    public ResponseEntity<?> authenticate(String email, String password) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            User user = userPrincipal.getUser();
            String accessToken = jwtUtil.generateAccessToken(user);
            HashMap<String, String> map = new HashMap<String, String>();
            map.put("token", accessToken);
            return ResponseEntity.ok().body(map);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    public ResponseEntity<?> registerUser(User userInfos) {
        if (userRepository.findByEmail(userInfos.getEmail()).isPresent())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("'error':'Email already exists'");
        //   throw  new HttpClientErrorException(HttpStatus.BAD_REQUEST,"Email déja existe");
        User user = new User();
        user.setEmail(userInfos.getEmail());
        user.setPassword(passwordEncoder.encode(userInfos.getPassword()));
        user.setFirst_name(userInfos.getFirst_name());
        user.setLast_name(userInfos.getLast_name());
        user.setPhone(userInfos.getPhone());
        user.setPhoto("");
        user.setRole("USER");
        userRepository.save(user);
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
        String accessToken = jwtUtil.generateAccessToken(user);
        HashMap<String, String> map = new HashMap<String, String>();
        map.put("token", accessToken);
        return ResponseEntity.ok().body(map);

    }

    public ResponseEntity<?> sendVerificationCode(String email) {

        Random rand = new Random();
        String code = String.valueOf(rand.nextLong()).substring(3, 7);
        redisConnection.getConnection().stringCommands().set(email.getBytes(), code.getBytes());
        //TODO: Send email with code
        return ResponseEntity.ok().body(code);

    }


    public ResponseEntity<?> whoami() {
        return ResponseEntity.ok().body(this.getAuthenticatedUser());
    }

    public ResponseEntity<?> resetPassword(String password) {
        User user = this.getAuthenticatedUser();
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
        return ResponseEntity.ok().body(user);
    }

    public ResponseEntity<?> updateProfile(Map<String, String> updated_user) {
        User user = this.getAuthenticatedUser();
        user.setFirst_name(updated_user.get("first_name"));
        user.setLast_name(updated_user.get("last_name"));
        user.setPhone(updated_user.get("phone"));
        user.setEmail(updated_user.get("email"));
        userRepository.save(user);
        String accessToken = jwtUtil.generateAccessToken(user);
        HashMap<String, String> map = new HashMap<String, String>();
        map.put("token", accessToken);
        return ResponseEntity.ok().body(map);
    }

    public ResponseEntity<?> updateProfilePicture(MultipartFile photo) {
        if (photo != null) {
            User user = this.getAuthenticatedUser();
            Path path = Path.of(StringUtils.cleanPath("./public/avatar/" + photo.getOriginalFilename()));
            try {
                photo.transferTo(path);
                user.setPhoto(this.mediaUrl +"public/avatar/" + photo.getOriginalFilename());
                userRepository.save(user);
                return ResponseEntity.ok().body(user);
            } catch (IOException e) {
                throw new HttpClientErrorException(HttpStatus.INTERNAL_SERVER_ERROR, "cannot access Directory");
            }
        }
        return ResponseEntity.badRequest().body("No photo uploaded");

    }
}
