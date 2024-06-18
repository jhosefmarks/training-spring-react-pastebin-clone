package com.jhosefmarks.pastebin_api.exceptions;

public class EmailExistsException extends RuntimeException {

  public EmailExistsException(String message) {
    super(message);
  }

}
