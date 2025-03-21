package ee.assignment.backend.repository;

import ee.assignment.backend.criteria.SeatSearchCriteria;
import ee.assignment.backend.enums.SeatPlace;
import ee.assignment.backend.model.Seat;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class SeatCriteriaRepository {
    private static final Logger log = LoggerFactory.getLogger(SeatCriteriaRepository.class);
    private final EntityManager entityManager;

    public List<Seat> searchSeats(SeatSearchCriteria criteria) {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Seat> criteriaQuery = builder.createQuery(Seat.class);
        Root<Seat> root = criteriaQuery.from(Seat.class);

        List<Predicate> predicates = new ArrayList<>();

        if (criteria.getFlightId() != null) {
            predicates.add(builder.equal(root.get("flight").get("id"), criteria.getFlightId()));
        }

        if (criteria.getPlace() != null) {
            predicates.add(builder.equal(root.get("place"), criteria.getPlace()));
        }
        if (criteria.getLegSpace() != null) {
            predicates.add(builder.equal(root.get("legSpace"), criteria.getLegSpace()));
        }
        if (criteria.getSeatClass() != null) {
            predicates.add(builder.equal(root.get("seatClass"), criteria.getSeatClass().name()));
        }

        if (!predicates.isEmpty()) {
            criteriaQuery.select(root).where(builder.and(predicates.toArray(new Predicate[0])));
        } else {
            criteriaQuery.select(root);
        }

        TypedQuery<Seat> typedQuery = entityManager.createQuery(criteriaQuery);
        return typedQuery.getResultList();
    }
}
