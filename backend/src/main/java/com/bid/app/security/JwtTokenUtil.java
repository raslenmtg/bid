package com.bid.app.security;


import com.bid.app.model.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class JwtTokenUtil {

    private static final String SECRET_KEY = "ERJfecTxjMULSJeYmVO10BBOTiXI5WGyevRN7cY80ioQ8ykUvLC38S4NPxi3rc4e";

    private static final long EXPIRE_DURATION = 24 * 60 * 60 * 1000; // 24 hour

    public String generateAccessToken(User user) {
        try {
            ObjectMapper Obj = new ObjectMapper();
            JwtContent jwtContent = new JwtContent();
            jwtContent.id = user.getId();
            jwtContent.first_name = user.getFirst_name();
            jwtContent.last_name = user.getLast_name();
            jwtContent.email = user.getEmail();
            jwtContent.role = user.getRole();
            return Jwts.builder()
                    .setSubject(Obj.writeValueAsString(jwtContent))
                    .setIssuer("Hezblech")
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + EXPIRE_DURATION))
                    .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                    .compact();
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error while generating token", e);
        }
    }

    public boolean validateAccessToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (Exception ignored) {
        }

        return false;
    }

    public String getSubject(String token) {
        return parseClaims(token).getSubject();
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }


}
