package com.socialmedia.springmongodb.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.socialmedia.springmongodb.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.socialmedia.springmongodb.dto.UserResponse;
import com.socialmedia.springmongodb.dto.UserUpdateRequest;
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
            userResponse.setCreatedDate(userList.get(i).getCreated());
            userResponse.setUpdatedDate(userList.get(i).getUpdated());
            finalList.add(userResponse);
        }
        return new ResponseEntity<>(finalList, HttpStatus.OK);
    } 

    public ResponseEntity<Object> getUserbyId(String id) {
        User user = userRepository.findById(id).orElseThrow(()->new SpringSocialMediaException("User id :" + id + " Not Found!"));
        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setUsername(user.getUsername());
        userResponse.setEmail(user.getEmail());            
        userResponse.setCreatedDate(user.getCreated());
        userResponse.setUpdatedDate(user.getUpdated());
        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }
    
    public ResponseEntity<Object> updateUser(String id, UserUpdateRequest userUpdateRequest) {
        User user = userRepository.findById(id).orElseThrow(()->new SpringSocialMediaException("User id :" + id + " Not Found!"));
        user.setUsername(userUpdateRequest.getUsername());
        user.setEmail(userUpdateRequest.getEmail());
        user.setUpdated(new Date());
        userRepository.save(user);
        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setUsername(user.getUsername());
        userResponse.setEmail(user.getEmail());            
        userResponse.setCreatedDate(user.getCreated());
        userResponse.setUpdatedDate(new Date());
        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }

    public ResponseEntity<String> deleteUser(String id) {
        try {
            userRepository.deleteById(id);
            return new ResponseEntity<>("User deleted successfully!", HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>("Error ", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
