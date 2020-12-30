package com.socialmedia.springmongodb.dto;

import java.io.InputStream;

public class Photo {
    private InputStream stream;

    public Photo() {
    }

    public InputStream getStream() {
        return stream;
    }

    public void setStream(InputStream stream) {
        this.stream = stream;
    }
}
