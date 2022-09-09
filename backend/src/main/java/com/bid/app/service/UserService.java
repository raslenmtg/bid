package com.bid.app.service;

import com.bid.app.model.User;
import com.bid.app.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;


    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User AddUser(User user) {
        String pw_hash = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
        user.setBalance((float) 0);
        user.setRole("USER");
        user.setPassword(pw_hash);
        return userRepository.save(user);
    }


    public void deleteUser(Long id){
       userRepository.deleteById(id);
    }


    public List<User> getUsers(){
        return userRepository.findAll();
    }


}
