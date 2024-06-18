package com.jhosefmarks.pastebin_api.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.jhosefmarks.pastebin_api.entities.UserEntity;

@Repository
 public interface UserRepository extends CrudRepository<UserEntity, Long> {
  UserEntity findByEmail(String email);
}
