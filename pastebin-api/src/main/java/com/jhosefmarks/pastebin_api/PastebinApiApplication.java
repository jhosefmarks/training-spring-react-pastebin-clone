package com.jhosefmarks.pastebin_api;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.jhosefmarks.pastebin_api.models.responses.UserRest;
import com.jhosefmarks.pastebin_api.security.AppProperties;
import com.jhosefmarks.pastebin_api.shared.dto.UserDto;

@SpringBootApplication
@EnableJpaAuditing
public class PastebinApiApplication {

  public static void main(String[] args) {
    SpringApplication.run(PastebinApiApplication.class, args);
  }

  @Bean
  public BCryptPasswordEncoder bCryptPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }

	@Bean
	public SpringApplicationContext springApplicationContext() {
		return new SpringApplicationContext();
	}

  @Bean(name = "AppProperties")
	public AppProperties getAppProperties() {
		return new AppProperties();
	}

  @Bean
  public ModelMapper modelMapper() {
    ModelMapper mapper = new ModelMapper();

    mapper
      .typeMap(UserDto.class, UserRest.class)
      .addMappings(m -> m.skip(UserRest::setPosts));

    return mapper;
  }
}
