package com.ranjith.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.*;
import com.ranjith.backend.dto.ChatRequest;
import com.ranjith.backend.dto.ChatResponse;
import com.ranjith.backend.entity.Chat;
import com.ranjith.backend.service.ChatService;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

	private final ChatService chatService;
	
	public ChatController(ChatService chatService) {
		this.chatService = chatService;
	}
	
	@PostMapping("/create")
	
	public Chat creaChat() {
		return chatService.createChat();
	}
	
	@PostMapping("/send")
	public ChatResponse sendMessage(@RequestBody ChatRequest request) {
		return chatService.sendMessage(request);
	}
	
	@GetMapping("/{chatId}/messages")
	public ResponseEntity<?> getMessage(@PathVariable Long chatId){
		return ResponseEntity.ok(chatService.getMessages(chatId));
	}
	
	@GetMapping("/all")
	public ResponseEntity<?> getAllChat(){
		return ResponseEntity.ok(chatService.getAllChats());
	}
}
