export default function Spinner() {
  return (
    <div className="spinner-container">
      {/* Чистый SVG спиннер, который крутится за счет CSS */}
      <svg className="spinner-svg" viewBox="0 0 50 50">
        <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
      </svg>
    </div>
  );
}
