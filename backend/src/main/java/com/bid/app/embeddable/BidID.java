package com.bid.app.embeddable;


import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class BidID implements Serializable {
    @Column(name = "session_id")
    Long session_id;

    @Column(name = "user_id")
    Long user_id;

}



