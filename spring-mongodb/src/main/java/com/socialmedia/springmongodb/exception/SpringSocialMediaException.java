package com.socialmedia.springmongodb.exception;

public class SpringSocialMediaException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    
    public SpringSocialMediaException(String message, Exception exception) {
        super(message, exception);
    }

    public SpringSocialMediaException(String message) {
        super(message);
    }
}
