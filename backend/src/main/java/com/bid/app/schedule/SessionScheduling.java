package com.bid.app.schedule;

import com.bid.app.model.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.TaskScheduler;


public class SessionScheduling{

    private Session session;
    @Autowired
    private TaskScheduler taskScheduler;



    public SessionScheduling(Session session) {
        this.session = session;
        taskScheduler.schedule(new SetSubscribers(session.getId()),session.getStarted_at());
    }

}
