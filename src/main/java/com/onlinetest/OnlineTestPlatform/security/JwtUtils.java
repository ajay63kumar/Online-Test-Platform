
package com.onlinetest.OnlineTestPlatform.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
@Slf4j
public class JwtUtils {

    private final String issuer;
    private final int expiryMinutes;
    private final SecretKey key;

    public JwtUtils(
            @Value("${jwt.secret}") String base64Secret,
            @Value("${jwt.issuer}") String issuer,
            @Value("${jwt.expiry-minutes}") int expiryMinutes) {
        this.issuer = issuer;
        this.expiryMinutes = expiryMinutes;

        byte[] secretBytes = io.jsonwebtoken.io.Decoders.BASE64.decode(base64Secret);
        this.key = Keys.hmacShaKeyFor(secretBytes); // >= 256 bits or throws WeakKeyException
        log.info("✅ JwtUtils initialized. Expiry set to {} minutes", expiryMinutes);
    }

    // -------- Token Utils ----------

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = Jwts.parser()   // ✅ In 0.12.x you don’t call parserBuilder()
                .verifyWith(key)        // ✅ replaces setSigningKey
                .requireIssuer(issuer)  // ✅ same as before
                .build()
                .parseSignedClaims(token) // ✅ replaces parseClaimsJws
                .getPayload();

        return claimsResolver.apply(claims);
    }

//    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
//        Claims claims = Jwts.parserBuilder()
//                .setSigningKey(key)
//                .requireIssuer(issuer)
//                .build()
//                .parseClaimsJws(token)
//                .getBody();
//        return claimsResolver.apply(claims);
//    }



    public String generateToken(UserDetails userDetails) {
        long nowMillis = System.currentTimeMillis();
        long expMillis = nowMillis + expiryMinutes * 60 * 1000L;
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuer(issuer)
                .setIssuedAt(new Date(nowMillis))
                .setExpiration(new Date(expMillis))
                .signWith(key)
                .compact();
    }


    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}


//package com.onlinetest.OnlineTestPlatform.security;
//
//import com.onlinetest.OnlineTestPlatform.model.User;
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import io.jsonwebtoken.security.Keys;
//import jakarta.annotation.PostConstruct;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Service;
//
//import javax.crypto.SecretKey;
//import java.nio.charset.StandardCharsets;
//import java.time.Instant;
//import java.time.temporal.ChronoUnit;
//import java.util.Date;
//import java.util.function.Function;
//
//@Service
//@Slf4j
//public class JwtUtils {
//
//    // Token validity = 24 hours
//    private static final long EXPIRATION_TIME_MS = 1000 * 60 * 60 * 24;
//    private final String issuer;
//    private final int expiryMinutes;
//    private final SecretKey key;
//
//    //    private SecretKey key;
////
////    @Value("${jwt.secret}")
////    private String secretJwtString;
////
////    public JwtUtils(String secretJwtString) {
////        this.secretJwtString = secretJwtString;
////    }
//    public JwtUtils(
//            @Value("${app.jwt.secret}") String base64Secret,
//            @Value("${app.jwt.issuer}") String issuer,
//            @Value("${app.jwt.expiry-minutes}") int expiryMinutes) {
//        this.issuer = issuer;
//        this.expiryMinutes = expiryMinutes;
//        byte[] secretBytes = io.jsonwebtoken.io.Decoders.BASE64.decode(base64Secret);
//        this.key = io.jsonwebtoken.security.Keys.hmacShaKeyFor(secretBytes); // >= 256 bits or throws WeakKeyException
//    }
////    @Value("${jwt.secret}")
////    private String secretJwtString;
//
//    @PostConstruct
//    private void init() {
//        if (secretJwtString == null || secretJwtString.length() < 32) {
//            throw new IllegalStateException("❌ jwt.secret is missing or too short! Must be at least 32 characters.");
//        }
//        this.key = Keys.hmacShaKeyFor(secretJwtString.getBytes(StandardCharsets.UTF_8));
//        log.info("✅ JwtUtils initialized. Secret length: {}", secretJwtString.length());
//    }
//
//
//    //    @PostConstruct
////    private void init() {
////        // Use the configured secret string, not random each time
////        this.key = Keys.hmacShaKeyFor(secretJwtString.getBytes(StandardCharsets.UTF_8));
////    }
//    public String generateToken(String username, String role) {
//        Instant now = Instant.now();
//        return Jwts.builder()
//                .subject(username)
//                .issuer(issuer)
//                .issuedAt(Date.from(now))
//                .expiration(Date.from(now.plus(expiryMinutes, ChronoUnit.MINUTES)))
//                .claim("role", role) // e.g., ROLE_ADMIN
//                .signWith(key, Jwts.SIG.HS256)
//                .compact();
//    }
//    /** Generate token for given user */
////    public String generateToken(User user) {
////        return Jwts.builder().subject(user.getEmail())
////                .claim("role", user.getRole().name()).issuedAt(new Date(System.currentTimeMillis())).expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME_MS))
////                .signWith(key, SignatureAlgorithm.HS256)
////                .compact();
////    }
//
//    /**
//     * Extract username (email)
//     */
//    public String getUsernameFromToken(String token) {
//        return extractClaims(token, Claims::getSubject);
//    }
//
//    /**
//     * Extract role
//     */
//    public String getRoleFromToken(String token) {
//        return extractClaims(token, claims -> claims.get("role", String.class));
//    }
//
//    /**
//     * Generic claim extractor
//     */
////    private <T> T extractClaims(String token, Function<Claims, T> claimsResolver) {
////        final Claims claims = Jwts.parserBuilder()
////                .setSigningKey(key)
////                .build()
////                .parseClaimsJws(token)
////                .getBody();
////        return claimsResolver.apply(claims);
////    }
//    private <T> T extractClaims(String token, Function<Claims, T> claimsTFunction) {
//        return claimsTFunction.apply(Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload());
//
//    }
//
//    public boolean isTokeValid(String token, UserDetails userDetails) {
//        final String username = getUsernameFromToken(token);
//        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
//    }
//
//    private boolean isTokenExpired(String token) {
//        return extractClaims(token, Claims::getExpiration).before(new Date());
//    }
//}
    /** Validate token */
//    public boolean isTokenValid(String token, UserDetails userDetails) {
//        final String username = getUsernameFromToken(token);
//        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
//    }
//
//    private boolean isTokenExpired(String token) {
//        return extractClaims(token, Claims::getExpiration).before(new Date());
//    }





//package com.onlinetest.OnlineTestPlatform.security;
//
//import com.onlinetest.OnlineTestPlatform.model.User;
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.security.Keys;
//import jakarta.annotation.PostConstruct;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Service;
//
//import javax.crypto.SecretKey;
//import java.util.Date;
//import java.util.function.Function;
//
//@Service
//@Slf4j
//public class JwtUtils {
//    @Autowired
//    private User user;
//    private static final Long EXPIRATION_TIME_IN_MILLISEC = 1000L * 60L * 60L * 24L * 30L * 6L;
//
//    private SecretKey key;
//
//    @Value("${secreteJwtString}")
//    private String secreateJwtString;
//
//    @PostConstruct
//    private void init() {
//        this.key = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256);
//
//    }
//
//    public String generateToken(String email) {
//        return Jwts.builder()
//                .subject(email)
//                .claim("role", user.getRole().name())
//                .issuedAt(new Date((System.currentTimeMillis())))
//                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME_IN_MILLISEC))
//                .signWith(key, io.jsonwebtoken.SignatureAlgorithm.HS256)
//                .compact();
//    }
//
//    public String getUsernameFromToken(String token) {
//        return extractClaims(token, Claims::getSubject);
//    }
//
//    private <T> T extractClaims(String token, Function<Claims, T> claimsTFunction) {
//        return claimsTFunction.apply(Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload());
//
//    }
//
//    public boolean isTokeValid(String token, UserDetails userDetails) {
//        final String username = getUsernameFromToken(token);
//        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
//    }
//
//    private boolean isTokenExpired(String token) {
//        return extractClaims(token, Claims::getExpiration).before(new Date());
//    }
//}
//
