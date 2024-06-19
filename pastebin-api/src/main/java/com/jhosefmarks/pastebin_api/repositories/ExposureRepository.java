package com.jhosefmarks.pastebin_api.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.jhosefmarks.pastebin_api.entities.ExposureEntity;

@Repository
public interface ExposureRepository extends CrudRepository<ExposureEntity, Long> {
  ExposureEntity findById(long id);
}
