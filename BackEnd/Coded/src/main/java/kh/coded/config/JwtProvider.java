package kh.coded.config;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import kh.coded.services.MemberService;

@Component
public class JwtProvider {
	@Value("${jwt.secret.key}")
	private String salt;
	@Autowired
	private MemberService memberService;
	
	private Key secretKey;
	private final long expire = 1000L * 60 * 60;
	
	@PostConstruct
	protected void init() {
		secretKey = Keys.hmacShaKeyFor(salt.getBytes(StandardCharsets.UTF_8));
	}
	
	public String createToken(String userID) {
		Claims claims = Jwts.claims().setSubject(userID);
		//claims.put("role", ~);
		Date now = new Date();
		return Jwts.builder()
				.setHeaderParam(Header.TYPE, Header.JWT_TYPE)
				.setIssuer("example sender")
				.setIssuedAt(now)
				.setExpiration(new Date(now.getTime() + expire))
				.setClaims(claims)
				.signWith(SignatureAlgorithm.HS256, secretKey)
				.compact();
	}
	
	public boolean validateToken(String token) {
		try {
			Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
			return true;
	    } catch (MalformedJwtException e) {
	      System.out.println("Invalid JWT token");
	      e.printStackTrace();
	    } catch (ExpiredJwtException e) {
	      System.out.println("Expired JWT token");
	      e.printStackTrace();
	    } catch (UnsupportedJwtException e) {
	      System.out.println("Unsupported JWT token");
	      e.printStackTrace();
	    } catch (IllegalArgumentException e) {
	      System.out.println("JWT claims string is empty.");
	      e.printStackTrace();
	    } catch(Exception e) {
	    	System.out.println("JWT Error");
	    	e.printStackTrace();
	    }
	    return false;
	}
	
	public String resolveToken(HttpServletRequest request) {
		return request.getHeader("Authorization");
	}
	
	public Authentication getAuthentication(String token) {
		UserDetails member = memberService.loadUserByUsername(this.getUserID(token));
		return new UsernamePasswordAuthenticationToken(member, "", member.getAuthorities());
	}
	
	private Claims parseJwtToken(String token) {
		return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
	}
	
	public String getUserID(String token) {
		return this.parseJwtToken(token).getSubject();
	}
}
