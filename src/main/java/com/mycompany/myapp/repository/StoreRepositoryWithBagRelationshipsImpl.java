package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Store;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class StoreRepositoryWithBagRelationshipsImpl implements StoreRepositoryWithBagRelationships {

    private static final String ID_PARAMETER = "id";
    private static final String STORES_PARAMETER = "stores";

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Store> fetchBagRelationships(Optional<Store> store) {
        return store.map(this::fetchSuppliers);
    }

    @Override
    public Page<Store> fetchBagRelationships(Page<Store> stores) {
        return new PageImpl<>(fetchBagRelationships(stores.getContent()), stores.getPageable(), stores.getTotalElements());
    }

    @Override
    public List<Store> fetchBagRelationships(List<Store> stores) {
        return Optional.of(stores).map(this::fetchSuppliers).orElse(Collections.emptyList());
    }

    Store fetchSuppliers(Store result) {
        return entityManager
            .createQuery("select store from Store store left join fetch store.suppliers where store.id = :id", Store.class)
            .setParameter(ID_PARAMETER, result.getId())
            .getSingleResult();
    }

    List<Store> fetchSuppliers(List<Store> stores) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, stores.size()).forEach(index -> order.put(stores.get(index).getId(), index));
        List<Store> result = entityManager
            .createQuery("select store from Store store left join fetch store.suppliers where store in :stores", Store.class)
            .setParameter(STORES_PARAMETER, stores)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
