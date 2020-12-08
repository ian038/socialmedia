package com.socialmedia.springmongodb.service;

import java.util.ArrayList;
import java.util.List;

import com.socialmedia.springmongodb.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.socialmedia.springmongodb.dto.UserResponse;
import com.socialmedia.springmongodb.exception.SpringSocialMediaException;
import com.socialmedia.springmongodb.model.User;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<List<Object>> getUsers() {
        List<User> userList = userRepository.findAll();
        List<Object> finalList = new ArrayList<Object>();
        for(int i = 0; i < userList.size(); i++) {
            UserResponse userResponse = new UserResponse();
            userResponse.setId(userList.get(i).getId());
            userResponse.setUsername(userList.get(i).getUsername());
            userResponse.setEmail(userList.get(i).getEmail());
            finalList.add(userResponse);
        }
        return new ResponseEntity<>(finalList, HttpStatus.OK);
    } 

    public ResponseEntity<Object> getUserbyId( String id) {
        User user = userRepository.findById(id).orElseThrow(()->new SpringSocialMediaException("User id :" + id + " Not Found!"));
        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setUsername(user.getUsername());
        userResponse.setEmail(user.getEmail());
        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }
    
}
