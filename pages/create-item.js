/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Benefits from '../components/create-item/Benefits.component';
import { useGlobalContext } from '../providers/GlobalProviders';
import { layerModel, layerTypeModel } from '../providers/layerModel';
import { Button } from 'react-bootstrap';

export default function CreateItem() {
  const {
    updateTotalTokens,
    updateTotalRoyalties,
    layerVariables,
    totalTokens,
    totalRoyalties,
  } = useGlobalContext();
  const [fileCoverUrl, setFileCoverUrl] = useState();
  const [errorTokens, setErrorTokens] = useState();
  const [errorPercentage, setErrorPercentage] = useState();
  const [totalTokensError, setTotalTokensError] = useState();
  const [totalPercentageError, setTotalPercentageError] = useState();

  useEffect(() => {
    const totalTokensSum = Object.values(layerVariables)
      .map((n) => +n[layerTypeModel.NO_TOKENS])
      .filter((e) => e)
      .reduce((a, b) => a + b, 0);
    const totalPercentageSum = Object.values(layerVariables)
      .map((n) => +n[layerTypeModel.PERCENTAGE])
      .filter((e) => e)
      .reduce((a, b) => a + b, 0);
    totalTokensSum > totalTokens &&
      setTotalTokensError(
        `El total de tokens debe ser igual a  ${totalTokens}`
      );
    totalPercentageSum > totalRoyalties &&
      setTotalPercentageError(
        `El total de porcentajes debe ser igual a  ${totalRoyalties}%`
      );
    return () => {
      setTotalTokensError();
      setTotalPercentageError();
    };
  }, [layerVariables, totalRoyalties, totalTokens]);

  const [formValues, setFormValues] = useState({
    NFTName: '',
    description: '',
    streamingUrl: '',
    noTotalTokens: '',
    percentageTokens: '',
    benefits: '',
  });
  const [benefitsArray, setBenefitsArray] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    console.log('check all validations ');

    //TODO: get total tokens sum and compare if is not greater than total amount of tokens,
    // same for total percentage
    //if theres error display error messages
  }

  function onChangeCover(e) {
    if (e.target.files.length === 0) return;
    const preview = URL?.createObjectURL(e.target.files[0]);
    setFileCoverUrl(preview);
  }

  function handleChange(event) {
    setErrorPercentage();
    setErrorTokens();
    if (!event.target.value) {
      event.target.name === 'noTotalTokens' &&
        updateTotalTokens(event.target.value);
      event.target.name === 'percentageTokens' &&
        updateTotalRoyalties(event.target.value);
      return;
    }
    if (event.target.name === 'noTotalTokens') {
      if (!(event.target.value > 0 && event.target.value <= 10_000)) {
        setErrorTokens('Ingrese valores entre 1 y 10_000');
        return;
      }
    }
    if (event.target.name === 'percentageTokens') {
      if (!(event.target.value > 0 && event.target.value <= 100)) {
        setErrorPercentage('Ingrese valores entre 1 y 100');
        return;
      }
    }

    setFormValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    if (event.target.name === 'benefits') {
      const allBenefits = event.target.value.split('\n').filter((e) => e);
      setBenefitsArray(allBenefits);
      const _layerVariables = { ...layerVariables };
      Object.keys(layerModel).map((val) => {
        _layerVariables[val]['benefits'] = allBenefits.reduce(
          (a, b) => ({
            ...a,
            [b.toLowerCase().replaceAll(' ', '-')]: false,
          }),
          {}
        );
      });
    }
    event.target.name === 'noTotalTokens' &&
      updateTotalTokens(event.target.value);
    event.target.name === 'percentageTokens' &&
      updateTotalRoyalties(event.target.value);
  }

  const validForm =
    !errorTokens &&
    !errorPercentage &&
    formValues.noTotalTokens &&
    formValues.percentageTokens;
  return (
    <div className='w-3/4 mx-auto my-10'>
      <div className='pb-32'>
        <div className='grid grid-cols-2 gap-5'>
          <div>
            <span className=''>NFT Cover</span>
            <Form.Group controlId='nftCover' className='mb-3'>
              <Form.Label>
                {fileCoverUrl && (
                  <img
                    src={fileCoverUrl}
                    className='cursor-pointer'
                    title='Edit NFT cover'
                    alt={`file-cover`}
                    width={275}
                  />
                )}
              </Form.Label>
              <Form.Control
                type='file'
                size='sm'
                onChange={onChangeCover}
                hidden={fileCoverUrl}
              />
              <div>
                <Form.Text className='text-muted'>
                  PNG, JPG, GIF up to 10MB
                </Form.Text>
              </div>
            </Form.Group>
          </div>
          {/* 2 */}

          <div>
            <FloatingLabel
              controlId='floatingInput'
              label='Asset name'
              className='mb-3'
            >
              <Form.Control
                type='text'
                name='NFTName'
                onChange={handleChange}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId='floatingTextDescription'
              label='Description'
              className='mb-3'
            >
              <Form.Control
                as='textarea'
                style={{ height: '100px' }}
                onChange={handleChange}
                name='description'
              />
            </FloatingLabel>
            <FloatingLabel
              controlId='floatingURL'
              label='Streaming single/album URL'
              className='mb-3'
            >
              <Form.Control
                type='text'
                name='streamingUrl'
                onChange={handleChange}
              />
            </FloatingLabel>
          </div>
        </div>

        {/* token detailed info */}
        <div className='mt-5'>
          <div className='grid grid-cols-2 gap-5'>
            <FloatingLabel
              controlId='tokenNumber'
              label='Numero total de tokens a mintear'
              className='mb-3'
            >
              <Form.Control
                type='number'
                onChange={handleChange}
                name='noTotalTokens'
                min='1'
                aria-describedby={`noTotalTokens`}
                className={errorTokens ? 'error-input-border' : undefined}
              />
              {errorTokens && (
                <Form.Text id={`noTotalTokens`}>
                  <span className={'text-red-400'}>{errorTokens}</span>
                </Form.Text>
              )}
            </FloatingLabel>

            <FloatingLabel
              controlId='tokenNumber'
              label='Porcentaje a ceder para regalias ex. 20%'
              className='mb-3'
            >
              <Form.Control
                type='number'
                onChange={handleChange}
                name='percentageTokens'
                min='1'
                max='100'
                aria-describedby={`percentageTokens`}
                className={errorPercentage ? 'error-input-border' : undefined}
              />
              {errorPercentage && (
                <Form.Text id={`percentageTokens`}>
                  <span className={'text-red-400'}>{errorPercentage}</span>
                </Form.Text>
              )}
            </FloatingLabel>
          </div>

          <div className='my-4'>
            <FloatingLabel controlId='allPerks' label='Describe all benefits'>
              <Form.Control
                as='textarea'
                style={{ height: '150px' }}
                onChange={handleChange}
                value={formValues.benefits}
                name='benefits'
              />
            </FloatingLabel>
          </div>
          {validForm && (
            <div className='mt-10'>
              <p className='my-3'>
                La distribuci&oacute;n de NFTs se va a dar en 3 layers
              </p>

              <div className='my-4'>
                <form onSubmit={handleSubmit}>
                  <ul className='grid grid-cols-3 gap-4 mt-10'>
                    {Object.keys(layerModel).map((_key) => (
                      <li
                        className='border border-gray-300 rounded-lg p-4 pb-0 shadow-md'
                        key={_key}
                      >
                        <Benefits type={_key} benefitsArray={benefitsArray} />
                      </li>
                    ))}
                  </ul>
                  {totalTokensError && (
                    <span className={'text-red-400 block my-2'}>
                      {totalTokensError}
                    </span>
                  )}
                  {totalPercentageError && (
                    <span className={'text-red-400 block my-2'}>
                      {totalPercentageError}
                    </span>
                  )}
                  <Button
                    variant='primary'
                    type='submit'
                    className='fixed bottom-5 w-3/4 mx-auto'
                    size='lg'
                  >
                    Mint file
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
