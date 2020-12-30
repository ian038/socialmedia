package com.socialmedia.springmongodb.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.socialmedia.springmongodb.repository.UserRepository;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mongodb.client.gridfs.model.GridFSFile;
import com.socialmedia.springmongodb.dto.Follow;
import com.socialmedia.springmongodb.dto.Photo;
import com.socialmedia.springmongodb.dto.UserResponse;
import com.socialmedia.springmongodb.dto.UserUpdateRequest;
import com.socialmedia.springmongodb.exception.SpringSocialMediaException;
import com.socialmedia.springmongodb.model.User;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private GridFsTemplate gridFsTemplate;

    @Autowired
    private GridFsOperations operations;

    public ResponseEntity<List<Object>> getUsers() {
        List<User> userList = userRepository.findAll();
        List<Object> finalList = new ArrayList<Object>();
        for (int i = 0; i < userList.size(); i++) {
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
        User user = userRepository.findById(id)
                .orElseThrow(() -> new SpringSocialMediaException("User id: " + id + " Not Found!"));
        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setUsername(user.getUsername());
        userResponse.setEmail(user.getEmail());
        userResponse.setPhoto(user.getPhoto());
        userResponse.setCreatedDate(user.getCreated());
        userResponse.setUpdatedDate(user.getUpdated());
        userResponse.setAbout(user.getAbout());
        userResponse.setFollowers(user.getFollowers());
        userResponse.setFollowing(user.getFollowing());
        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }

    public ResponseEntity<Object> updateUser(String id, UserUpdateRequest userUpdateRequest, MultipartFile file) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new SpringSocialMediaException("User id: " + id + " Not Found!"));
        ObjectId photoId;
        try {
            photoId = gridFsTemplate.store(file.getInputStream(), file.getName(), file.getContentType());
            user.setPhoto(photoId.toString());
        } catch (IOException e) {
            return new ResponseEntity<>("Error " + e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        user.setUsername(userUpdateRequest.getUsername());
        user.setEmail(userUpdateRequest.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(userUpdateRequest.getPassword()));
        user.setUpdated(new Date());
        user.setAbout(userUpdateRequest.getAbout());
        userRepository.save(user);
        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setUsername(user.getUsername());
        userResponse.setEmail(user.getEmail());
        userResponse.setPhoto(user.getPhoto());
        userResponse.setCreatedDate(user.getCreated());
        userResponse.setUpdatedDate(new Date());
        userResponse.setAbout(user.getAbout());
        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }

    public ResponseEntity<String> deleteUser(String id) {
        try {
            userRepository.deleteById(id);
            return new ResponseEntity<>("User deleted successfully!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error ", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public Photo getUserProfilePhoto(String id) throws IllegalStateException, IOException {
        User user = userRepository.findById(id).orElseThrow(() -> new SpringSocialMediaException("User id: " + id + " Not Found!"));
        GridFSFile file = gridFsTemplate.findOne(new Query(Criteria.where("_id").is(user.getPhoto())));
        Photo photo = new Photo();
        photo.setStream(operations.getResource(file).getInputStream());
        return photo;
    }

    public ResponseEntity<Object> addFollowing(String userId, String followId) {
        // get user id
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new SpringSocialMediaException("User id: " + userId + " Not Found!"));
        // get id of person you are following
        User following = userRepository.findById(followId)
            .orElseThrow(() -> new SpringSocialMediaException("Following id: " + followId + " Not Found!"));

        // store info of person you are following
        Follow follow = new Follow();
        follow.setId(followId);
        follow.setUsername(following.getUsername());
        user.addFollowing(follow);

        // store follower info
        Follow follower = new Follow();
        follower.setId(userId);
        follower.setUsername(user.getUsername());
        following.addFollower(follower);

        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setUsername(user.getUsername());
        userResponse.setEmail(user.getEmail());
        userResponse.setPhoto(user.getPhoto());
        userResponse.setCreatedDate(user.getCreated());
        userResponse.setUpdatedDate(new Date());
        userResponse.setAbout(user.getAbout());
        userResponse.setFollowing(user.getFollowing());
        userResponse.setFollowers(user.getFollowers());
        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }

    public ResponseEntity<Object> removeFollowingAndFollower(String userId, String unfollowId) {
        // get user id
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new SpringSocialMediaException("User id: " + userId + " Not Found!"));
        // get id of person you want to unfollowing
        User unfollowing = userRepository.findById(unfollowId)
            .orElseThrow(() -> new SpringSocialMediaException("Following id: " + unfollowId + " Not Found!"));

        // store info of person you are unfollowing
        Follow unfollow = new Follow();
        unfollow.setId(unfollowId);
        user.removeFollowing(unfollow.getId());

        // store follower info
        Follow follower = new Follow();
        follower.setId(userId);
        follower.setUsername(user.getUsername());
        unfollowing.removeFollower(follower.getId());

        UserResponse userResponse = new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setUsername(user.getUsername());
        userResponse.setEmail(user.getEmail());
        userResponse.setPhoto(user.getPhoto());
        userResponse.setCreatedDate(user.getCreated());
        userResponse.setUpdatedDate(new Date());
        userResponse.setAbout(user.getAbout());
        userResponse.setFollowing(user.getFollowing());
        userResponse.setFollowers(user.getFollowers());
        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }
}
