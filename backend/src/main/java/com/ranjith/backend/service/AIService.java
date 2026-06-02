package com.ranjith.backend.service;
import java.util.HashMap;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
public class AIService {

	@Value("${groq.api.key}")
	private String apiKey;
	
	private final RestTemplate restTemplate;
	
	public AIService(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}
	
	public String getAIResponse(String userMessage) {
		String url = "https://api.groq.com/openai/v1/chat/completions";
		
		HttpHeaders headers = new HttpHeaders();
		
		headers.setContentType(MediaType.APPLICATION_JSON);
		
		headers.setBearerAuth(apiKey);
		
		Map<String, Object> body = new HashMap<>();
		
		body.put("model","llama-3.3-70b-versatile");
		
		body.put("messages", List.of(
				Map.of(
						"role","user","content",userMessage
						)
				)
			);
		
		HttpEntity<Map<String, Object>> request = new HttpEntity<>(body,headers);
		
		ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST,request,Map.class);
		
		List<Map<String, Object>> choices = (List<Map<String, Object>>)
				response.getBody().get("choices");
		
		Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");	
				return message.get("content").toString();
 	}
}
