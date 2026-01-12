import "../styles/scss/confirmDialog.scss";

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="confirm-dialog-overlay" onClick={onCancel}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <h3 className="confirm-dialog-title">{title}</h3>
        <p className="confirm-dialog-message">{message}</p>
        <div className="confirm-dialog-actions">
          <button className="confirm-dialog-btn cancel-btn" onClick={onCancel}>
            Скасувати
          </button>
          <button
            className="confirm-dialog-btn confirm-btn"
            onClick={onConfirm}
          >
            Видалити
          </button>
        </div>
      </div>
    </div>
  );
}
