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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class FlightCriteriaRepository {
    private static final Logger log = LoggerFactory.getLogger(FlightCriteriaRepository.class);
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

        if (criteria.getDurationStartTime() != null && criteria.getDurationEndTime() != null) {
            Integer durationStartTime = criteria.getDurationStartTime();
            Integer durationEndTime = criteria.getDurationEndTime();
            predicates.add(builder.between(root.get("duration"), durationStartTime, durationEndTime));
        }

        if (criteria.getPriceStart() != null &&  criteria.getPriceEnd() != null) {
            Double priceStart = criteria.getPriceStart();
            Double priceEnd = criteria.getPriceEnd();
            predicates.add(builder.between(root.get("price"), priceStart, priceEnd));
        }

        if (criteria.getDepartureStartTime() != null
                && criteria.getDepartureEndTime() != null
                && criteria.getDepartureTime() != null) {
            int departureStartHour = criteria.getDepartureStartTime() / 2;
            int departureStartMinute = (criteria.getDepartureStartTime() % 2) * 30;

            if (departureStartHour == 24) {
                departureStartHour = 23;
                departureStartMinute = 59;
            }

            int departureEndHour = criteria.getDepartureEndTime() / 2;
            int departureEndMinute = (criteria.getDepartureEndTime() % 2) * 30;

            if (departureEndHour == 24) {
                departureEndHour = 23;
                departureEndMinute = 59;
            }

            LocalDateTime startTime = criteria.getDepartureTime().atStartOfDay()
                    .withHour(departureStartHour).withMinute(departureStartMinute);
            LocalDateTime endTime = criteria.getDepartureTime().atStartOfDay()
                    .withHour(departureEndHour).withMinute(departureEndMinute);
            predicates.add(builder.between(root.get("departureTime"), startTime, endTime));
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
