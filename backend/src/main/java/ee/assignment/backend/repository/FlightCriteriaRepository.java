package ee.assignment.backend.repository;

import ee.assignment.backend.criteria.FlightSearchCriteria;
import ee.assignment.backend.model.Flight;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class FlightCriteriaRepository {
    private final EntityManager entityManager;

    public List<Flight> getAllFlights(FlightSearchCriteria criteria) {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Flight> criteriaQuery = builder.createQuery(Flight.class);
        Root<Flight> root = criteriaQuery.from(Flight.class);

        List<Predicate> predicates = new ArrayList<>();

        if (criteria.getDeparture() != null && !criteria.getDeparture().isEmpty()) {
            predicates.add(builder.equal(root.get("departure"), criteria.getDeparture()));
        }
        if (criteria.getDestination() != null && !criteria.getDestination().isEmpty()) {
            predicates.add(builder.equal(root.get("destination"), criteria.getDestination()));
        }
        if (criteria.getDepartureTime() != null) {

            LocalDateTime startOfDay = criteria.getDepartureTime().atStartOfDay();
            LocalDateTime endOfDay = criteria.getDepartureTime().atTime(LocalTime.MAX);
            predicates.add(builder.between(root.get("departureTime"), startOfDay, endOfDay));
        }

        if (!predicates.isEmpty()) {
            criteriaQuery.select(root).where(builder.and(predicates.toArray(new Predicate[0])));
        } else {
            criteriaQuery.select(root);
        }

        TypedQuery<Flight> typedQuery = entityManager.createQuery(criteriaQuery);
        return typedQuery.getResultList();
    }
}
