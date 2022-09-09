package com.bid.app.service;

import com.bid.app.model.Session;
import com.bid.app.model.Subscriber;
import com.bid.app.model.User;
import com.bid.app.repository.SessionRepository;
import com.bid.app.repository.SubscriberRepository;
import com.bid.app.repository.UserRepository;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

@Service
public class SessionService {

    private final SessionRepository SessionRepository;
    private final SubscriberRepository SubscriberRepository;
    private final UserRepository UserRepository;


    public SessionService(SessionRepository sessionRepository, SubscriberRepository subscriberRepository, UserRepository userRepository) {
        SessionRepository = sessionRepository;
        SubscriberRepository = subscriberRepository;
        UserRepository = userRepository;
    }


    public List<Session> getSessions() {
        return this.SessionRepository.findAll(Sort.by("id").descending());
    }

    public Session saveSession(Session session) {
        return this.SessionRepository.save(session);
    }
    public Session updateSession(Session session) {
        return this.SessionRepository.save(session);
    }

    public void deleteSession(Long id){
        this.SessionRepository.deleteById(id);
    }
    public ResponseEntity<?> subscribeToSession(Long session_id) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Session session = this.SessionRepository.findById(session_id).orElseThrow(() -> new HttpClientErrorException(HttpStatus.NOT_FOUND, "aucune session trouvé"));
        if (session.getParticipation_fees() > user.getBalance())
            throw new HttpClientErrorException(HttpStatus.BAD_REQUEST, "solde insuffisant");
        user.setBalance(user.getBalance() - session.getParticipation_fees());
        Subscriber subscriber = new Subscriber(user, session);
        this.SubscriberRepository.save(subscriber);
        this.UserRepository.save(user);
        return new ResponseEntity(HttpStatus.OK);
    }

    public List<User> getSessionSubscribers(Long session_id) {
        return this.SubscriberRepository.getAllSubscribersBySessionId(session_id);
    }




}
