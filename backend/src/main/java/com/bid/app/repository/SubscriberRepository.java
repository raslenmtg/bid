package com.bid.app.repository;

import com.bid.app.model.Subscriber;
import com.bid.app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SubscriberRepository extends JpaRepository<Subscriber, Long> {

    @Query("SELECT s.user from Subscriber s where s.session=?1 ")
    List<User> getAllSubscribersBySessionId(Long session_id);
}
