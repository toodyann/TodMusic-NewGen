import "../styles/scss/Components/confirmDialog.scss";

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  t,
  itemName,
}) {
  if (!isOpen) return null;

  return (
    <div className="confirm-dialog-overlay" onClick={onCancel}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <h3 className="confirm-dialog-title">{t("confirmTitle")}</h3>
        <p className="confirm-dialog-message">
          {t("deleteConfirm").replace("{name}", itemName || "")}
        </p>
        <div className="confirm-dialog-actions">
          <button className="confirm-dialog-btn cancel-btn" onClick={onCancel}>
            {t("cancel")}
          </button>
          <button
            className="confirm-dialog-btn confirm-btn"
            onClick={onConfirm}
          >
            {t("delete")}
          </button>
        </div>
      </div>
    </div>
  );
}
