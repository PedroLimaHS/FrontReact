function Modal({
    titulo,
    texto,
    txtBtn1 = "Salvar",
    txtBtn2 = "Cancelar",
    onClickBtn1,
    onClickBtn2,
    onClickBtnClose
}) {
    return (
        <div className="modal modal-dialog-centered" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{titulo}</h5>
                        {onClickBtnClose && (
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={onClickBtnClose}
                            ></button>
                        )}
                    </div>
                    <div className="modal-body">
                        <p>{texto}</p>
                    </div>
                    <div className="modal-footer">
                        {onClickBtn2 && txtBtn2 && (
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={onClickBtn2}
                            >
                                {txtBtn2}
                            </button>
                        )}
                        {onClickBtn1 && txtBtn1 && (
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={onClickBtn1}
                            >
                                {txtBtn1}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;