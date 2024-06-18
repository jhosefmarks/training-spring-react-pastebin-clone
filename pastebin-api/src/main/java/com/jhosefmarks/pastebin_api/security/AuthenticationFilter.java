package com.jhosefmarks.pastebin_api.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import io.jsonwebtoken.Jwts;

import com.jhosefmarks.pastebin_api.SpringApplicationContext;
import com.jhosefmarks.pastebin_api.models.requests.UserLoginRequestModel;
import com.jhosefmarks.pastebin_api.services.UserServiceInterface;
import com.jhosefmarks.pastebin_api.shared.dto.UserDto;

public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

  private final AuthenticationManager authenticationManager;

    public AuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response
    ) throws AuthenticationException {
      try {
        UserLoginRequestModel userModel =
          new ObjectMapper().readValue(request.getInputStream(), UserLoginRequestModel.class);

        return authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(userModel.getEmail(), userModel.getPassword(), new ArrayList<>()));
      } catch (IOException e) {
        throw new RuntimeException(e);
      }
    }

     @Override
    public void successfulAuthentication(
      HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication
    ) throws IOException, ServletException {
        String username = ((User) authentication.getPrincipal()).getUsername();

        // https://github.com/mvm11/webflux_security/blob/main/demo/src/main/java/com/example/security/infrastructure/drivenadapter/security/jwt/provider/JwtProvider.java
        String token = Jwts.builder()
          .subject(username)
          .issuedAt(new Date())
          // .claim("roles", userDetails.getAuthorities())
          .expiration(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_DATE))
          .signWith(SecurityConstants.getTokenSecret())
          .compact();

        UserServiceInterface userService = (UserServiceInterface) SpringApplicationContext.getBean("userService");
        UserDto userDto = userService.getUser(username);

        response.addHeader("Access-Control-Expose-Headers", "Authorization, UserId");
        response.addHeader("UserId", userDto.getUserId());
        response.addHeader(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX + token);
    }
}
