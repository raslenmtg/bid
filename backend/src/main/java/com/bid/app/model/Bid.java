package com.bid.app.model;


import com.bid.app.embeddable.BidID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Bid {

    @EmbeddedId
    private BidID id;

    @ManyToOne
    @JoinColumn(name = "user_id",insertable = false, updatable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "session_id",insertable = false, updatable = false)
    private Session session;

    private int total_used_token;

}
