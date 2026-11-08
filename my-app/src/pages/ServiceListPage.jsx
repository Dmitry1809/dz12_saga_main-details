import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchListRequest } from '../store/serviceListSlice';
import Spinner from '../components/Spinner';
import ErrorView from '../components/ErrorView';

export default function ServiceListPage() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.serviceList);

  useEffect(() => {
    dispatch(fetchListRequest());
  }, [dispatch]); // Линтер доволен, так как используется сам dispatch

  if (loading) return <Spinner />;
  if (error) return <ErrorView message={error} onRetry={() => dispatch(fetchListRequest())} />;

  return (
    <div className="page-container">
      <h1>Список услуг</h1>
      <ul className="services-list">
        {items.map((service) => (
          <li key={service.id} className="service-item">
            <Link to={`/${service.id}/details`}>
              <span className="service-name">{service.name}</span>
              <span className="service-price">{service.price} руб.</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
