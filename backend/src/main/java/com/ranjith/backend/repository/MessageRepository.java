package com.ranjith.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ranjith.backend.entity.Message;

public interface MessageRepository  extends JpaRepository<Message, Long>{

	List<Message> findByChatId(Long chatId);
}
