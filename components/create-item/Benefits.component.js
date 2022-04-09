import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useGlobalContext } from '../../providers/GlobalProviders';
import styles from './Benefits.component.module.scss';
import { layerModel, layerTypeModel } from '../../providers/layerModel';

const Benefits = ({ type, benefitsArray }) => {
  const { totalTokens, totalRoyalties, updateLayerVariables } =
    useGlobalContext();
  const [error, setError] = useState();
  console.log('totalTokens', totalTokens);
  console.log('totalRoyalties', totalRoyalties);
  //TODO: make total percentage royalties math operation for an specific layer using total(token and percentage) variables
  //TODO: after enter values(tokens) on each layer, display error/warning messages on inputs
  const handleChange = (e) => {
    updateLayerVariables(type, e.target.name, e.target.value);

    if (e.target.name === layerTypeModel.NO_TOKENS) {
      setError();
      +e.target.value >= +totalTokens &&
        setError(`Tokens should be less than total amount ${totalTokens}`);
    }
  };

  const [totalPercentage, setTotalPercentage] = useState();
  return (
    <>
      <span className='uppercase font-bold'>{layerModel[type]}</span>
      <div className='my-4 pl-3'>
        <div className='my-4 grid grid-cols-2 gap-5'>
          <FloatingLabel
            controlId={`numeroTokens-${type}`}
            label='Numero de tokens'
            className='mb-3 col-s'
          >
            <Form.Control
              type='number'
              aria-describedby={`numeroTokens-${type}-numBlock`}
              className={error ? 'error-input-border' : undefined}
              onChange={handleChange}
              name={layerTypeModel.NO_TOKENS}
              min='1'
            />
            {error && (
              <Form.Text id={`numeroTokens-${type}-numBlock`}>
                <span className={'text-red-400'}>{error}</span>
              </Form.Text>
            )}
          </FloatingLabel>
          <FloatingLabel
            controlId={`precioToken-${type}`}
            label='Precio en USD por token ex. $99'
            className='mb-3'
          >
            <Form.Control
              type='number'
              onChange={handleChange}
              name={layerTypeModel.PRICE}
              min='1'
            />
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
              name={`${type}-${b.replaceAll(' ', '-')}`}
              id={`${type}-${b.replaceAll(' ', '-')}-${index + 1}`}
              onChange={(event) =>
                console.log('event checker', event.target.checked)
              }
            />
            <label
              className='cursor-pointer capitalize-first-letter'
              htmlFor={`${type}-${b.replaceAll(' ', '-')}-${index + 1}`}
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
