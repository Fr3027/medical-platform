package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A Advisory.
 */
@Entity
@Table(name = "advisory")
public class Advisory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "created")
    private ZonedDateTime created;

    @Column(name = "updated")
    private ZonedDateTime updated;

    @Column(name = "title")
    private String title;

    @Column(name = "detail")
    private String detail;

    @Column(name = "answer")
    private String answer;

    @OneToOne
    @JoinColumn(unique = true)
    private User initiator;

    @OneToOne
    @JoinColumn(unique = true)
    private User proposer;

    @ManyToOne
    @JsonIgnoreProperties(value = "advisories", allowSetters = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getCreated() {
        return created;
    }

    public Advisory created(ZonedDateTime created) {
        this.created = created;
        return this;
    }

    public void setCreated(ZonedDateTime created) {
        this.created = created;
    }

    public ZonedDateTime getUpdated() {
        return updated;
    }

    public Advisory updated(ZonedDateTime updated) {
        this.updated = updated;
        return this;
    }

    public void setUpdated(ZonedDateTime updated) {
        this.updated = updated;
    }

    public String getTitle() {
        return title;
    }

    public Advisory title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDetail() {
        return detail;
    }

    public Advisory detail(String detail) {
        this.detail = detail;
        return this;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getAnswer() {
        return answer;
    }

    public Advisory answer(String answer) {
        this.answer = answer;
        return this;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public User getInitiator() {
        return initiator;
    }

    public Advisory initiator(User user) {
        this.initiator = user;
        return this;
    }

    public void setInitiator(User user) {
        this.initiator = user;
    }

    public User getProposer() {
        return proposer;
    }

    public Advisory proposer(User user) {
        this.proposer = user;
        return this;
    }

    public void setProposer(User user) {
        this.proposer = user;
    }

    public User getUser() {
        return user;
    }

    public Advisory user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Advisory)) {
            return false;
        }
        return id != null && id.equals(((Advisory) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Advisory{" +
            "id=" + getId() +
            ", created='" + getCreated() + "'" +
            ", updated='" + getUpdated() + "'" +
            ", title='" + getTitle() + "'" +
            ", detail='" + getDetail() + "'" +
            ", answer='" + getAnswer() + "'" +
            "}";
    }
}
