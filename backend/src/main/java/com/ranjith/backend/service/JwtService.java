package com.ranjith.backend.service;
import java.security.Key;
import java.util.Date;
import io.jsonwebtoken.Claims;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

	private static final String SECRET_KEY = 
			"mysecretkeymysecretkeymysecretkey12345";
	private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
	
	public String generateToken(String email) {
		return Jwts.builder()
		.setSubject(email)
		.setIssuedAt(new Date())
		.setExpiration(
				new Date(System.currentTimeMillis()+1000 *60 *60)
				)
		.signWith(key,SignatureAlgorithm.HS256)
		.compact();
		
	} 
	
	public String extractEmail(String token) {
		return extractClaims(token).getSubject();
	}
	public Claims extractClaims(String token) {
		return Jwts.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(token)
				.getBody();
	}
	public boolean isTokenValid(String token) {

	    return !extractClaims(token)
	            .getExpiration()
	            .before(new Date());
	}
	
}
