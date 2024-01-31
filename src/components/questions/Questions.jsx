import css from "../questions/Questions.module.css";

const Questions = ({ question, selectedLanguage, deleteQuestion }) => {
	const filterQuestion = selectedLanguage
		? question.filter((e) => e.languages === selectedLanguage)
		: question;

	return (
		<div className={css.questions}>
			<ul className={css.ul}>
				{filterQuestion.map((question, index, _id) => (
					<li className={css.li} key={index}>
						<p>Вопрос: {question?.inputQuestion}</p>
						<p>Язык: {question?.languages}</p>
						<button onClick={()=>deleteQuestion(question?._id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Questions;
