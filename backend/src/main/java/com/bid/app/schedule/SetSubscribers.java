package com.bid.app.schedule;

import com.bid.app.model.User;
import com.bid.app.repository.SubscriberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.RedisSetCommands;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;

import java.nio.ByteBuffer;
import java.util.List;


public class SetSubscribers implements Runnable{

    private Long session_id;
    @Autowired
    private  JedisConnectionFactory redisConnection;
    @Autowired
    private   SubscriberRepository subscriberRepository;



    public SetSubscribers(Long session_id) {
        this.session_id = session_id;
    }


    @Override
    public void run() {

        List<User> users=this.subscriberRepository.getAllSubscribersBySessionId(this.session_id);
        if(users.size()!=0){
            RedisSetCommands redis=redisConnection.getConnection().setCommands();
            String session="session"+this.session_id;
            ByteBuffer buffer = ByteBuffer.allocate(Long.BYTES);
            users.forEach(user ->{
            redis.sAdd(session.getBytes(), buffer.putLong(user.getId()).array());

            });


        }



    }




}
