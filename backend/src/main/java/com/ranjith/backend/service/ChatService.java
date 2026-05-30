package com.ranjith.backend.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ranjith.backend.dto.ChatRequest;
import com.ranjith.backend.dto.ChatResponse;
import com.ranjith.backend.entity.Chat;
import com.ranjith.backend.entity.Message;
import com.ranjith.backend.repository.ChatRepository;
import com.ranjith.backend.repository.MessageRepository;

@Service
public class ChatService {

	private final ChatRepository chatRepository;
	private final MessageRepository messageRepository;
	private final AIService aiService;
	
	public ChatService (ChatRepository chatRepository , MessageRepository messageRepository,
			AIService aiService) {
		this.chatRepository = chatRepository;
		this.messageRepository = messageRepository;
		this.aiService = aiService;
	}
	
	public Chat createChat() {
		Chat chat = new Chat();
		return chatRepository.save(chat);
	}
	
	public ChatResponse sendMessage(ChatRequest request) {
		Chat chat = chatRepository.findById(request.getChatId()).orElseThrow();
		
		Message userMessage = new Message();
		userMessage.setChat(chat);
		userMessage.setSender("USER");
		
		userMessage.setMessage(request.getMessage());
		
		messageRepository.save(userMessage);
		
		
		String aiReply = aiService.getAIResponse( request.getMessage());
		
		Message aiMessage = new Message();
		
		aiMessage.setChat(chat);
		aiMessage.setSender("AI");
		
		aiMessage.setMessage(aiReply);
		messageRepository.save(aiMessage);
		
		return new ChatResponse(aiReply);
	}
	
	public List<Message> getMessages(Long chatId){
		return messageRepository.findByChatId(chatId);
	}
	
	public List<Chat> getAllChats(){
		return chatRepository.findAllByOrderByIdDesc()
;	}
}
