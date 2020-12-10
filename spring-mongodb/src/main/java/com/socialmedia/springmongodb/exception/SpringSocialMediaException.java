package com.socialmedia.springmongodb.exception;

public class SpringSocialMediaException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    
    public SpringSocialMediaException(String details, Exception exception) {
        super(details, exception);
    }

    public SpringSocialMediaException(String details) {
        super(details);
    }
}
