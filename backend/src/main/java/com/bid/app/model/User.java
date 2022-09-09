package com.bid.app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

import static javax.persistence.InheritanceType.SINGLE_TABLE;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="user")
//@Inheritance(strategy=SINGLE_TABLE)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String first_name;
    private String last_name;
    private String phone;
    private String photo;
    private String password;
    private String email;
    private String role;
    private Float balance;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private List<Transaction> transactions;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private List<Subscriber> subscribers;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private List<Bid> bids;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private List<LastBidders> lastBiddings;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private List<Notification> notifications;

   /* @OneToMany(mappedBy = "winner_id", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private List<Session> winnings;*/



}
