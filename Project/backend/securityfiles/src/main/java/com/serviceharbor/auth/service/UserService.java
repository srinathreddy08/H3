package com.serviceharbor.auth.service;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.serviceharbor.auth.model.ChangePasswordRequest;
import com.serviceharbor.auth.model.Role;
import com.serviceharbor.auth.model.User;
import com.serviceharbor.auth.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserByRoleAndEmail(String role, String email) {
        Role userRole;
        try {
            userRole = Role.valueOf(role.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid role: " + role);
        }
        return userRepository.findByRoleAndEmail(userRole, email);
    }
    public List<User> allUsers() {
        List<User> users = new ArrayList<>();

        userRepository.findAll().forEach(users::add);

        return users;
    }

    public User registerUser(User user) {
        return userRepository.save(user);
    }
    public boolean changePassword(String email, ChangePasswordRequest request) {
		System.out.println(request);
		User user=userRepository.findByEmail(email).get();
		if(user!=null) {
			user.setPassword(passwordEncoder.encode(request.getConfirmPassword()));
			userRepository.save(user);
			return true;
		}
		return false;
	}

}
