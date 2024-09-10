package com.jhosefmarks.pastebin_api.models.requests;

import org.hibernate.validator.constraints.Range;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class PostCreateRequestModel {

  @NotEmpty(message = "O título é obrigatório")
  private String title;

  @NotEmpty(message = "O conteúdo é obrigatório")
  private String content;

  @NotNull(message = "A exposição é obrigatória")
  @Range(min = 1, max = 2, message = "A exposição do post é inválida")
  private long exposureId;

  @NotNull(message = "O tempo de expiração é obrigatório")
  @Range(min = 0, max = 1440, message = "O tempo de expiração é inválido")
  private int expirationTime;

  public String getTitle() {
    return this.title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getContent() {
    return this.content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public long getExposureId() {
    return this.exposureId;
  }

  public void setExposureId(long exposureId) {
    this.exposureId = exposureId;
  }

  public int getExpirationTime() {
    return this.expirationTime;
  }

  public void setExpirationTime(int expirationTime) {
    this.expirationTime = expirationTime;
  }

}
