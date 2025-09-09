package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.myapp.domain.enumeration.NotificationAudience;
import com.mycompany.myapp.domain.enumeration.NotificationChannel;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Notification.
 */
@Entity
@Table(name = "notification")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Notification implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @Lob
    @Column(name = "content", nullable = false)
    private String content;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "audience", nullable = false)
    private NotificationAudience audience;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "channel", nullable = false)
    private NotificationChannel channel;

    @Column(name = "sent_at")
    private Instant sentAt;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "notification")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "notification", "customer" }, allowSetters = true)
    private Set<NotificationReceipt> receipts = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Notification id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public Notification title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return this.content;
    }

    public Notification content(String content) {
        this.setContent(content);
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public NotificationAudience getAudience() {
        return this.audience;
    }

    public Notification audience(NotificationAudience audience) {
        this.setAudience(audience);
        return this;
    }

    public void setAudience(NotificationAudience audience) {
        this.audience = audience;
    }

    public NotificationChannel getChannel() {
        return this.channel;
    }

    public Notification channel(NotificationChannel channel) {
        this.setChannel(channel);
        return this;
    }

    public void setChannel(NotificationChannel channel) {
        this.channel = channel;
    }

    public Instant getSentAt() {
        return this.sentAt;
    }

    public Notification sentAt(Instant sentAt) {
        this.setSentAt(sentAt);
        return this;
    }

    public void setSentAt(Instant sentAt) {
        this.sentAt = sentAt;
    }

    public Set<NotificationReceipt> getReceipts() {
        return this.receipts;
    }

    public void setReceipts(Set<NotificationReceipt> notificationReceipts) {
        if (this.receipts != null) {
            this.receipts.forEach(i -> i.setNotification(null));
        }
        if (notificationReceipts != null) {
            notificationReceipts.forEach(i -> i.setNotification(this));
        }
        this.receipts = notificationReceipts;
    }

    public Notification receipts(Set<NotificationReceipt> notificationReceipts) {
        this.setReceipts(notificationReceipts);
        return this;
    }

    public Notification addReceipts(NotificationReceipt notificationReceipt) {
        this.receipts.add(notificationReceipt);
        notificationReceipt.setNotification(this);
        return this;
    }

    public Notification removeReceipts(NotificationReceipt notificationReceipt) {
        this.receipts.remove(notificationReceipt);
        notificationReceipt.setNotification(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Notification)) {
            return false;
        }
        return getId() != null && getId().equals(((Notification) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Notification{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", content='" + getContent() + "'" +
            ", audience='" + getAudience() + "'" +
            ", channel='" + getChannel() + "'" +
            ", sentAt='" + getSentAt() + "'" +
            "}";
    }
}
