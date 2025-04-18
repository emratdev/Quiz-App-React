// import react
import { useState } from "react";

// components
import Result from "./Result";

// toast
import toast from "react-hot-toast";

function Test({ questions: { color, icon, questions, title } }) {
  const [answeredQuestions, setAnsweredQuestions] = useState(1);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [statusDisabled, setStatusDisabled] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const correctAnswer = questions[questionIndex].answer;

    if (selectedAnswer == null) {  
      toast.error("Please, select an answer");
      return;
    }

    if (selectedAnswer === correctAnswer) {
      setAnswerStatus("correct");
      setCorrectAnswerCount((prev) => prev + 1);
    } else {
      setAnswerStatus("incorrect");
    }

    setShowNextButton(true);
    setStatusDisabled(true);
  };

  const handleNextQuestion = () => {
    setQuestionIndex((prev) => prev + 1);
    setAnsweredQuestions((prev) => prev + 1);
    setSelectedAnswer(null);
    setShowNextButton(false);
    setAnswerStatus(null);
    setStatusDisabled(false);
  };

  if (questionIndex === questions.lenght) {
    toast.success("Congratulations", {
        icon: "🎆",
    });
    return (
    <Result 
        title={title}
        color={color}
        icon={icon}
        correctAnswerCount={correctAnswerCount}
        questions={questions}
    />    
    )
  }

  // If quiz is done, show final screen (you can style this better)
  if (questionIndex >= questions.length) {
    return (
      <div className="test-container">
        <h2 className="test-title">Quiz Complete!</h2>
        <p className="test-description">
          You got {correctAnswerCount} out of {questions.length} correct.
        </p>
      </div>
    );
  }

  const currentQuestion = questions[questionIndex];
  const progressPercentage = (answeredQuestions / questions.length) * 100;

  return (
    <div className="test-container">
      <div className="test-content">
        <p className="test-description">
          Question {answeredQuestions} of {questions.length}
        </p>
        <h2 className="test-title">{currentQuestion.question}</h2>

        <div className="test-process-container">
          <div
            className="test-process"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="test-questions">
        <form onSubmit={handleSubmit}>
          <ul className="test-list">
            {currentQuestion.options.map((option, index) => {
              const alphabet = String.fromCharCode(65 + index);
              let className = "";

              if (answerStatus === "correct" && option === selectedAnswer) {
                className = "correct";
              } else if (answerStatus === "incorrect") {
                if (option === selectedAnswer) {
                  className = "incorrect";
                }
                if (option === currentQuestion.answer) {
                  className = "correct";
                }
              }

              return (
                <li key={option}>
                  <label className={`test-label ${className}`}>
                    <span className="test-letter">{alphabet}</span>
                    <input
                      type="radio"
                      name="option"
                      value={option}
                      checked={selectedAnswer === option}
                      onChange={() => setSelectedAnswer(option)}
                      disabled={statusDisabled}
                    />
                    <span className="test-text">{option}</span>

                    {/* Show icons only when answerStatus is active */}
                    {answerStatus && selectedAnswer === option && answerStatus === "incorrect" && (
                      <img
                        className="test-icon-incorrect"
                        src="../assets/icon-incorrect.svg"
                        alt="incorrect icon"
                        width={40}
                        height={40}
                      />
                    )}
                    {answerStatus && option === currentQuestion.answer && (
                      <img
                        className="test-icon-correct"
                        src="../assets/icon-correct.svg"
                        alt="correct icon"
                        width={40}
                        height={40}
                      />
                    )}
                  </label>
                </li>
              );
            })}
          </ul>

          {!showNextButton && (
            <button className="btn test-btn" type="submit">
              Submit Question
            </button>
          )}

          {showNextButton && (
            <button
              className="btn test-btn"
              type="button"
              onClick={handleNextQuestion}
            >
              {answeredQuestions === questions.length ? "Finish" : "Next Question"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Test;
