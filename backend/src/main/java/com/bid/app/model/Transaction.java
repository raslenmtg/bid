package com.bid.app.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import java.util.Date;
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="transaction")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Float amount;
    private Date created_at;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
