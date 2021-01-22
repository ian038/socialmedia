package com.socialmedia.springmongodb.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Calendar;
import java.util.Date;

@Document(collection = "tokens")
public class PasswordResetToken {

    private static final int EXPIRATION = 60 * 24;

    @Id 
    private String id;

    private String token;

    private Date expiryDate;

    public PasswordResetToken() {
    }

    public PasswordResetToken(String token) {
      this.token = token;
      this.expiryDate = calculateExpiryDate(EXPIRATION);
    }

    public String getId() {
        return id;
      }
  
    public void setId(String id) {
        this.id = id;
    }

    public String getToken() {
        return token;
      }
  
    public void setToken(String token) {
        this.token = token;
    }

    public Date getExpiryDate() {
      return expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
      expiryDate = calculateExpiryDate(EXPIRATION);
      this.expiryDate = expiryDate;
    }

    private Date calculateExpiryDate(final int expiryTimeInMinutes) {
      final Calendar cal = Calendar.getInstance();
      cal.setTimeInMillis(new Date().getTime());
      cal.add(Calendar.MINUTE, expiryTimeInMinutes);
      return new Date(cal.getTime().getTime());
  }
}

