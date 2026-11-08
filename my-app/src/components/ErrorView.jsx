export default function ErrorView({ message, onRetry }) {
  return (
    <div className="error-container">
      <div className="error-message">
        {/* Можно добавить картинку-референс /assets/retry.png рядом с текстом */}
        <span>{message || 'Произошла непредвиденная ошибка.'}</span>
      </div>
      <button className="retry-button" onClick={onRetry}>
        Повторить запрос
      </button>
    </div>
  );
}
