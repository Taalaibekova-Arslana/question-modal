
import styles from "./Modal.module.css"; // Подключение ваших стилей

const Modal = ({
	modalka,
	closeModal,
	inputQuestion,
	setInputQuestion,
	languages,
	setLanguages,
	createQuestion,
	randomQuestion,
	randomizeQuestion,
}) => {
	const modalStyle = {
		display: modalka ? "block" : "none",
	};

	return (
		<div>
			{modalka && <div className={styles.overlay}></div>}
			<div>
				<div>
					{modalka === "add" ? (
						<div style={modalStyle} className={styles.modal}>
							<label htmlFor="description">Вопрос:</label>
							<input className={styles.input}
								type="text"
								id="description"
								value={inputQuestion}
								onChange={(e) => setInputQuestion(e.target.value)}
							/>
							<label htmlFor="language">Язык:</label>
							<select className={styles.select}
								id="language"
								value={languages}
								onChange={(e) => setLanguages(e.target.value)}>
								<option value="JavaScript">JavaScript</option>
								<option value="React">React</option>
								<option value="HTML">HTML</option>
								<option value="CSS">CSS</option>
							</select>
							<button onClick={createQuestion}>Добавить</button>
							<button onClick={closeModal}>Закрыть</button>
						</div>
					) : modalka === "random" ? (
						<>
							<div style={modalStyle} className={styles.random}>
								<h3>Рандомный вопрос:</h3>
								<p>Вопрос: {randomQuestion?.inputQuestion}</p>
								<p>Язык: {randomQuestion?.languages}</p>
								<button onClick={randomizeQuestion}>Рандомный вопрос</button>
								<button onClick={closeModal}>Закрыть</button>
							</div>
						</>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default Modal;
