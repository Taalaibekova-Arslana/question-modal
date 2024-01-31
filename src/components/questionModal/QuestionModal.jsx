import React, { useState, useEffect } from "react";
import Questions from "../questions/Questions";
import Modal from "../modal/Modal";
import styled from "../questionModal/QuestionModal.module.css";

const QuestionModal = () => {
	const [modalka, setModalka] = useState("");
	const [question, setQuestion] = useState([]);
	const [inputQuestion, setInputQuestion] = useState("");
	const [languages, setLanguages] = useState("");
	const [selectedLanguage, setSelectedLanguage] = useState("");
	const [randomQuestion, setRandomQuestion] = useState(null);

	const url =
		"https://elchocrud.pro/api/v1/4000804ed43dce74c91486380691db85/question";

	const getQuestion = () => {
		fetch(url)
			.then((response) => response.json())
			.then((data) => setQuestion(data))
			.catch((err) => console.error("error get", err));
	};

	useEffect(() => {
		getQuestion();
	}, []);

	const createQuestion = () => {
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ inputQuestion, languages }),
		})
			.then((response) => response.json())
			.then(() => {
				closeModal();
				getQuestion();
			})
			.catch((err) => console.error("error post", err));
	};

	const deleteQuestion = async (id) => {
		try {
			await fetch(`${url}/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			getQuestion();
		} catch (error) {
			console.error(error);
		}
	};
	console.log(deleteQuestion);

	const randomizeQuestion = () => {
		const randomIndex = Math.floor(Math.random() * question.length);
		setRandomQuestion(question[randomIndex]);
		openModal("random");
	};

	const openModal = (type) => {
		setModalka(type);
	};

	const closeModal = () => {
		setModalka("");
	};

	return (
		<div>
			<button onClick={() => openModal("add")}>Добавить вопрос</button>
			<button onClick={randomizeQuestion}>Рандомный вопрос</button>
			<Modal
				modalka={modalka}
				closeModal={closeModal}
				inputQuestion={inputQuestion}
				setInputQuestion={setInputQuestion}
				languages={languages}
				setLanguages={setLanguages}
				createQuestion={createQuestion}
				randomQuestion={randomQuestion}
				randomizeQuestion={randomizeQuestion}
			/>
			<Questions
				question={question}
				selectedLanguage={selectedLanguage}
				deleteQuestion={deleteQuestion}
			/>
		</div>
	);
};

export default QuestionModal;
