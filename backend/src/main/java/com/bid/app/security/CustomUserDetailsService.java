package com.bid.app.security;

import com.bid.app.model.User;
import com.bid.app.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserPrincipal loadUserByUsername(String username) {
        User user = userRepository.findByEmail(username).orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND, "User not found"));
        return new UserPrincipal(user);
    }
}