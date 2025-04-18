// react-router-dom import
import { useParams } from 'react-router-dom';

// custom hooks
import { useFetch } from '../hooks/useFetch';

// react hooks
import { useEffect} from 'react';

// components
import { Test } from '../components';

function Quiz() {
  const {title} = useParams();
  const {data:quizess, isPending, error,} = useFetch(`https://json-api.uz/api/project/emrat-frontend-quizz/quizzes?title=${title}`

  );

  useEffect(() =>{
    document.title = "Quiz" + " " + title;
  },[title])


  return (
    <section className="quiz-container container">
      {isPending && <h3>Loading...</h3>}
      {error && <h3>{error}...</h3>}
      {quizess && <Test questions={quizess.data[0]} />}
      </section>
  )
}

export default Quiz