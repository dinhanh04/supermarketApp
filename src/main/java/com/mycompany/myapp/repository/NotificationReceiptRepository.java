package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.NotificationReceipt;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the NotificationReceipt entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NotificationReceiptRepository extends JpaRepository<NotificationReceipt, Long> {}
