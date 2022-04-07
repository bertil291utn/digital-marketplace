import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useGlobalContext } from '../../providers/GlobalProviders';

const Benefits = ({ title, benefitsArray }) => {
  const { totalTokens, totalRoyalties } = useGlobalContext();
  console.log('totalTokens', totalTokens);
  console.log('totalRoyalties', totalRoyalties);

  const [totalPercentage, setTotalPercentage] = useState();
  const benefitsGroupName = title.toLowerCase().replace(' ', '-');
  return (
    <>
      <span className='uppercase font-bold'>{title}</span>
      <div className='my-4 pl-3'>
        <div className='my-4 grid grid-cols-2 gap-5'>
          <FloatingLabel
            controlId={`numeroTokens-${benefitsGroupName}`}
            label='Numero de tokens'
            className='mb-3 col-s'
          >
            <Form.Control type='number' />
          </FloatingLabel>
          <FloatingLabel
            controlId={`precioToken-${benefitsGroupName}`}
            label='Precio en USD por token ex. $99'
            className='mb-3'
          >
            <Form.Control type='number' />
          </FloatingLabel>
        </div>
        <span className='block my-3 text-muted'>
          Seleccione los beneficios para este layer
        </span>
        {benefitsArray.map((b, index) => (
          <div key={index} className='flex gap-3 align-items-center'>
            <input
              className='h-4 w-4 cursor-pointer'
              type='checkbox'
              name={`${benefitsGroupName}-${b.replaceAll(' ', '-')}`}
              id={`${benefitsGroupName}-${b.replaceAll(' ', '-')}-${index + 1}`}
              onChange={(event) =>
                console.log('event checker', event.target.checked)
              }
            />
            <label
              className='cursor-pointer capitalize-first-letter'
              htmlFor={`${benefitsGroupName}-${b.replaceAll(' ', '-')}-${
                index + 1
              }`}
            >
              {b}
            </label>
          </div>
        ))}
        {totalPercentage && (
          <p className='my-4'>
            {`${totalPercentage} Porcentaje de ownership en este layer`}
          </p>
        )}
      </div>
    </>
  );
};

export default Benefits;
