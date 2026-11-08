import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink, Link } from 'react-router-dom';
import { fetchDetailsRequest } from '../store/serviceDetailsSlice';
import { fetchListRequest } from '../store/serviceListSlice';
import Spinner from '../components/Spinner';
import ErrorView from '../components/ErrorView';

export default function ServiceDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const listState = useSelector((state) => state.serviceList);
  const detailsState = useSelector((state) => state.serviceDetails);

  const listItemsLength = listState.items.length;
  const listLoading = listState.loading;
  const listError = listState.error;

  // Эффект для фоновой загрузки списка (для сайдбара)
  useEffect(() => {
    if (listItemsLength === 0 && !listLoading && !listError) {
      dispatch(fetchListRequest());
    }
  }, [dispatch, listItemsLength, listLoading, listError]);

  // Эффект для загрузки деталей конкретной услуги
  useEffect(() => {
    dispatch(fetchDetailsRequest(id));
  }, [dispatch, id]);

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <Link to="/" className="back-link">← На главную</Link>
        <h3>Все услуги:</h3>
        {listState.loading && <Spinner />}
        {listState.error && <p className="mini-error">Не удалось загрузить меню</p>}
        
        <ul className="services-list-sidebar">
          {listState.items.map((service) => (
            <li key={service.id}>
              <NavLink 
                to={`/${service.id}/details`}
                className={({ isActive }) => (isActive ? 'active-service' : '')}
              >
                {service.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      <main className="details-content">
        {detailsState.loading && <Spinner />}
        
        {detailsState.error && (
          <ErrorView 
            message={detailsState.error} 
            onRetry={() => dispatch(fetchDetailsRequest(id))} 
          />
        )}
        
        {!detailsState.loading && !detailsState.error && detailsState.item && (
          <div className="details-card">
            <h2>{detailsState.item.name}</h2>
            <p className="price-tag">
              <strong>Цена:</strong> {detailsState.item.price} руб.
            </p>
            <div className="content-body">
              <strong>Описание:</strong>
              <p>{detailsState.item.content}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
