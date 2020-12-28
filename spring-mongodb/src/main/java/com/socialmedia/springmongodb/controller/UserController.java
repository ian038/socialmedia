package com.socialmedia.springmongodb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.socialmedia.springmongodb.dto.UserUpdateRequest;
import com.socialmedia.springmongodb.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/")
    public ResponseEntity<?> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getUserbyId(@PathVariable("id") String id) {
        return userService.getUserbyId(id);
    }

    @PutMapping(value = "/update/{id}", consumes = "multipart/form-data")
    public ResponseEntity<Object> updateUser(@PathVariable("id") String id, @Valid @RequestPart("user") UserUpdateRequest userUpdateRequest, @RequestPart("image") @Valid @NotBlank @NotNull MultipartFile file) {
        return userService.updateUser(id, userUpdateRequest, file);
    }

    @DeleteMapping("/delete/{id}") 
    public ResponseEntity<String> deleteUser(@PathVariable("id") String id) {
        return userService.deleteUser(id);
    }
}
