package com.ranjith.backend;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class BackendApplication {

	public static void main(String[] args) {
		System.out.println(" ===  Ranjith Deployment Version");
		SpringApplication.run(BackendApplication.class, args);
	}

	 @GetMapping("/test")
	    public String test() {
	        return "Backend Working!";
	    }
	 
	 @GetMapping("/")
	 public String home() {
		 return "SPRING APP IS RUNNING";
	 }
}