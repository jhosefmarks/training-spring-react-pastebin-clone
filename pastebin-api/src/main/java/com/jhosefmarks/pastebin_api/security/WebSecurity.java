package com.jhosefmarks.pastebin_api.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

import com.jhosefmarks.pastebin_api.services.UserServiceInterface;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)
public class WebSecurity {

  private final UserServiceInterface userService;
  private final BCryptPasswordEncoder bCryptPasswordEncoder;

  public WebSecurity(UserServiceInterface userService, BCryptPasswordEncoder bCryptPasswordEncoder) {
    this.userService = userService;
    this.bCryptPasswordEncoder = bCryptPasswordEncoder;
  }

  @Bean
  public AuthenticationManager authenticationManager(
    HttpSecurity http, BCryptPasswordEncoder bCryptPasswordEncoder, UserDetailsService userDetailsService)  throws Exception {
      AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
      authenticationManagerBuilder.userDetailsService(this.userService).passwordEncoder(this.bCryptPasswordEncoder);

      AuthenticationManager authenticationManager = authenticationManagerBuilder.build();

      return authenticationManager;
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    AuthenticationManager authenticationManager = authenticationManager(http, this.bCryptPasswordEncoder, this.userService);

    http
      .cors(withDefaults())
      .csrf((csrf) -> csrf.disable())
      .authorizeHttpRequests((authz) -> authz
        .requestMatchers(HttpMethod.POST, "/users").permitAll()
        .requestMatchers("/error").permitAll()
        .anyRequest().authenticated())
      .addFilter(getAuthenticationFilter(authenticationManager))
      .addFilter(new AuthenticationFilter(authenticationManager))
      .addFilter(new AuthorizationFilter(authenticationManager))
      .authenticationManager(authenticationManager)
      .sessionManagement((session) -> session
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

    return http.build();
  }

  public AuthenticationFilter getAuthenticationFilter(AuthenticationManager authenticationManager) throws Exception {
    final AuthenticationFilter filter = new AuthenticationFilter(authenticationManager);

    // Não substitui /login
    filter.setFilterProcessesUrl("/users/login");

    return filter;
  }
}
