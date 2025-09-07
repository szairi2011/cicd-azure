package com.fis.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class NotSupportedException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public NotSupportedException() {
		super();
	}

	public NotSupportedException(String message, Throwable cause) {
		super(message, cause);
	}

	public NotSupportedException(String message) {
		super(message);
	}

	public NotSupportedException(Throwable cause) {
		super(cause);
	}

}
