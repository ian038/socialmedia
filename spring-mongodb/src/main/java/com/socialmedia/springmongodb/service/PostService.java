package com.socialmedia.springmongodb.service;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.HashMap;

import com.socialmedia.springmongodb.repository.CommentRepository;
import com.socialmedia.springmongodb.repository.PostRepository;

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

import com.socialmedia.springmongodb.exception.SpringSocialMediaException;
import com.mongodb.client.gridfs.model.GridFSFile;
import com.socialmedia.springmongodb.dto.LikeUnlike;
import com.socialmedia.springmongodb.dto.Photo;
import com.socialmedia.springmongodb.model.Comment;
import com.socialmedia.springmongodb.model.Post;
import com.socialmedia.springmongodb.model.User;
import com.socialmedia.springmongodb.repository.UserRepository;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private GridFsTemplate gridFsTemplate;

    @Autowired
    private GridFsOperations operations;

    public ResponseEntity<List<Post>> getPosts() {
        return new ResponseEntity<>(postRepository.findAll(), HttpStatus.OK);
    }

    public ResponseEntity<Post> getPostbyId(String id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new SpringSocialMediaException("Post id: " + id + " Not Found!"));
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    public ResponseEntity<Object> createPost(String userId, Post post, MultipartFile file) {
        User userInfo = userRepository.findById(userId)
                .orElseThrow(() -> new SpringSocialMediaException("User id :" + userId + " Not Found!"));
        ObjectId photoId;
        Post _post = new Post();
        try {
            photoId = gridFsTemplate.store(file.getInputStream(), file.getName(), file.getContentType());
            _post.setPhoto(photoId.toString());
        } catch (IOException e) {
            return new ResponseEntity<>("Error " + e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        HashMap<String, String> user = new HashMap<String, String>();
        user.put("id", userInfo.getId());
        user.put("username", userInfo.getUsername());

        _post.setTitle(post.getTitle());
        _post.setBody(post.getBody());
        _post.setPostedBy(user);
        _post.setCreated(new Date());
        _post.setLikes(_post.getLikes());
        _post.setComments(_post.getComments());
        postRepository.save(_post);
        return new ResponseEntity<>(_post, HttpStatus.CREATED);
    }

    public Photo getPostPhoto(String id) throws IllegalStateException, IOException {
        Post post = postRepository.findById(id).orElseThrow(() -> new SpringSocialMediaException("Post id: " + id + " Not Found!"));
        GridFSFile file = gridFsTemplate.findOne(new Query(Criteria.where("_id").is(post.getPhoto())));
        Photo photo = new Photo();
        photo.setStream(operations.getResource(file).getInputStream());
        return photo;
    }

    public ResponseEntity<List<Post>> getPostByUser(String userId) {
        List<Post> postedBy = postRepository.findByUserId(userId);
        return new ResponseEntity<>(postedBy, HttpStatus.OK);
    }

    public ResponseEntity<Object> updatePost(String userId, String postId, Post postRequest, MultipartFile file) {
        Post post = postRepository.findById(postId).orElseThrow(()->new SpringSocialMediaException("Post id :" + postId + " Not Found!"));
        ObjectId photoId;
        HashMap<String, String> postedByInfo = new HashMap<String, String>();
        postedByInfo = post.getPostedBy();
        if(!userId.equals(postedByInfo.get("id"))) {
            return new ResponseEntity<>("Access denied", HttpStatus.FORBIDDEN);
        }
        try {
            photoId = gridFsTemplate.store(file.getInputStream(), file.getName(), file.getContentType());
            post.setPhoto(photoId.toString());
        } catch (IOException e) {
            return new ResponseEntity<>("Error " + e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        post.setTitle(postRequest.getTitle());
        post.setBody(postRequest.getBody());
        post.setUpdated(new Date());
        postRepository.save(post);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    public ResponseEntity<String> deletePost(String userId, String postId) {
        Post post = postRepository.findById(postId).orElseThrow(()->new SpringSocialMediaException("Post id :" + postId + " Not Found!"));
        HashMap<String, String> postedByInfo = new HashMap<String, String>();
        try {
            postedByInfo = post.getPostedBy();
            if(!userId.equals(postedByInfo.get("id"))) {
                return new ResponseEntity<>("Access denied", HttpStatus.FORBIDDEN);
            }
            postRepository.deleteById(postId);
            return new ResponseEntity<>("Post deleted successfully!", HttpStatus.OK);
        } catch(Exception e) {
            return new ResponseEntity<>("Error " + e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Object> like(String userId, String postId) {
        Post post = postRepository.findById(postId).orElseThrow(()->new SpringSocialMediaException("Post id :" + postId + " Not Found!"));
        User user = userRepository.findById(userId).orElseThrow(() -> new SpringSocialMediaException("User id: " + userId + " Not Found!"));
        LikeUnlike like = new LikeUnlike();
        like.setId(user.getId());
        post.addLike(like);
        postRepository.save(post);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    public ResponseEntity<Object> unlike(String userId, String postId) {
        Post post = postRepository.findById(postId).orElseThrow(()->new SpringSocialMediaException("Post id :" + postId + " Not Found!"));
        for(int i = (post.getLikes().size() - 1); i >= 0; i--) {
            if(post.getLikes().get(i).getId().equals(userId)) {
                post.getLikes().remove(i);
            }
        }
        postRepository.save(post);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    public ResponseEntity<Object> comment(String userId, String postId, Comment comment) {
        Post post = postRepository.findById(postId).orElseThrow(()->new SpringSocialMediaException("Post id :" + postId + " Not Found!"));
        User userInfo = userRepository.findById(userId).orElseThrow(() -> new SpringSocialMediaException("User id: " + userId + " Not Found!"));
        HashMap<String, String> user = new HashMap<String, String>();
        user.put("id", userInfo.getId());
        user.put("username", userInfo.getUsername());

        Comment _comment = new Comment();
        _comment.setText(comment.getText());
        _comment.setPostedBy(user);
        _comment.setCreated(new Date());
        commentRepository.save(_comment);

        post.addComment(_comment);
        postRepository.save(post);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    public ResponseEntity<Object> uncomment(String commentId, String postId) {
        Post post = postRepository.findById(postId).orElseThrow(()->new SpringSocialMediaException("Post id :" + postId + " Not Found!"));
        for(int i = (post.getComments().size() - 1); i >= 0; i--) {
            if(post.getComments().get(i).getId().equals(commentId)) {
                commentRepository.deleteById(post.getComments().get(i).getId());
                post.getComments().remove(i);
            }
        }
        postRepository.save(post);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }
}