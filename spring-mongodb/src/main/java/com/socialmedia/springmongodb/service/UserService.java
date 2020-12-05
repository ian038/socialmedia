package com.socialmedia.springmongodb.service;

import java.util.List;

import com.socialmedia.springmongodb.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.socialmedia.springmongodb.exception.SpringSocialMediaException;
import com.socialmedia.springmongodb.model.User;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<List<User>> getUsers() {
        return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
    } 

    public ResponseEntity<User> getUserbyId( String id) {
        User users = userRepository.findById(id).orElseThrow(()->new SpringSocialMediaException("User id :" + id + " Not Found!"));
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    
}
