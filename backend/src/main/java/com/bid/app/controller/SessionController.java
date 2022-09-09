package com.bid.app.controller;

import com.bid.app.model.Session;
import com.bid.app.model.User;
import com.bid.app.service.SessionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SessionController {

    private final SessionService SessionService;


    public SessionController(SessionService sessionService) {
        SessionService = sessionService;
    }


    @PostMapping("session/{id}/subscribe")
    public ResponseEntity<?> subscribeToSession(@PathVariable("id") Long id) {
        return this.SessionService.subscribeToSession(id);
    }

    @GetMapping("session/{id}/subscribers")
    public List<User> getSessionSubscribers(@PathVariable("id") Long id) {
        return this.SessionService.getSessionSubscribers(id);
    }


    @GetMapping("session")
    public List<Session> getSession() {
        return this.SessionService.getSessions();
    }

    @PostMapping("session")
    public Session getSession(@RequestBody Session session) {
        return this.SessionService.saveSession(session);
    }

    @PutMapping("session")
    public Session updateSession(@RequestBody Session session) {
        return this.SessionService.updateSession(session);
    }

    @DeleteMapping("session/{id}")
    void deleteSession(@PathVariable("id") Long id) {
        this.SessionService.deleteSession(id);
    }


   /* @MessageMapping("bidders")
    public Flux<?> feedMarketData(MarketDataRequest marketDataRequest) {
        return marketDataRepository.getAll(marketDataRequest.getStock());
    }


    @MessageMapping("bid")
    public Mono<Void> collectMarketData(MarketData marketData) {

        return Mono.empty();
    }*/


}
