package com.bid.app.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Float participation_fees;
    private Date finished_at;
    private Date started_at;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "winner_product_id")
    private Product winner_product_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "winner_id")
    private User winner_id;

    @OneToMany(mappedBy = "session", fetch = FetchType.LAZY,
            cascade = CascadeType.REMOVE)
    private List<Subscriber> subscribers= new ArrayList<>();

    /*@OneToMany(mappedBy = "session", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private List<LastBidders> lastBidders= new ArrayList<>();*/

    @OneToMany(mappedBy = "session", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL)
    private List<Bid> bids= new ArrayList<>();

}