import { Link, useParams } from 'react-router-dom';

export default function SampleWithParam() {
  const { param } = useParams();

  return (
    <div className='p-8 text-center'>
      <h1>Sample with "{param}"</h1>

      <Link to='/' className='underline'>
        Go to Home
      </Link>
    </div>
  );
}
