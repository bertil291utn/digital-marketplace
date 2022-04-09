/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Benefits from '../components/create-item/Benefits.component';
import { useGlobalContext } from '../providers/GlobalProviders';
import { layerModel } from '../providers/layerModel';

export default function CreateItem() {
  const { updateTotalTokens, updateTotalRoyalties, layerVariables } =
    useGlobalContext();
  console.log('layerVariables', layerVariables);
  const [fileCoverUrl, setFileCoverUrl] = useState();
  const [errorTotalTokens, setErrorTotalTokens] = useState();
  const [errorTotalPercentage, setErrorTotalPercentage] = useState();
  //TODO: UI improvement, add distribution same ad final user view,
  // left nft image, right description below url
  //under layers as cards distribution

  const [formValues, setFormValues] = useState({
    NFTName: '',
    description: '',
    streamingUrl: '',
    noTotalTokens: '',
    percentageTokens: '',
    benefits: '🎫 VIP tickets',
  });
  const [benefitsArray, setBenefitsArray] = useState([formValues.benefits]);

  function onChangeCover(e) {
    const preview = URL?.createObjectURL(e.target.files[0]);
    setFileCoverUrl(preview);
  }

  function handleChange(event) {
    if (!event.target.value) {
      setErrorTotalPercentage();
      setErrorTotalTokens();
      return;
    }
    if (event.target.name === 'noTotalTokens') {
      setErrorTotalTokens();
      if (!(event.target.value > 0 && event.target.value <= 10_000)) {
        setErrorTotalTokens('Values between 1 and 10_000');
        return;
      }
    }
    if (event.target.name === 'percentageTokens') {
      setErrorTotalPercentage();
      if (!(event.target.value > 0 && event.target.value <= 100)) {
        setErrorTotalPercentage('Values between 1 and 100');
        return;
      }
    }

    setFormValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    event.target.name === 'benefits' &&
      setBenefitsArray(event.target.value.split('\n').filter((e) => e));
    event.target.name === 'noTotalTokens' &&
      updateTotalTokens(event.target.value);
    event.target.name === 'percentageTokens' &&
      updateTotalRoyalties(event.target.value);
  }
  console.log('form', formValues);

  const validForm =
    !errorTotalTokens &&
    !errorTotalPercentage &&
    formValues.noTotalTokens &&
    formValues.percentageTokens;
  return (
    <div className='w-3/4 mx-auto my-10'>
      <div className='pb-12'>
        <div className='grid grid-cols-2 gap-5'>
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
            >
              <Form.Control
                as='textarea'
                style={{ height: '100px' }}
                onChange={handleChange}
                name='description'
              />
            </FloatingLabel>
          </div>
          <div>
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
                      width={200}
                      height={200}
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
        </div>

        {/* token detailed info */}
        <div>
          <div className='grid grid-cols-2 gap-5'>
            <div>
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
                  className={
                    errorTotalTokens ? 'error-input-border' : undefined
                  }
                />
                {errorTotalTokens && (
                  <Form.Text id={`noTotalTokens`}>
                    <span className={'text-red-400'}>{errorTotalTokens}</span>
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
                  className={
                    errorTotalPercentage ? 'error-input-border' : undefined
                  }
                />
                {errorTotalPercentage && (
                  <Form.Text id={`percentageTokens`}>
                    <span className={'text-red-400'}>
                      {errorTotalPercentage}
                    </span>
                  </Form.Text>
                )}
              </FloatingLabel>
            </div>
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
            <>
              <p className='my-5'>
                La distribuci&oacute;n de NFTs se va a dar en 3 layers
              </p>

              <div className='my-4'>
                <ul>
                  {Object.keys(layerModel).map((_key) => (
                    <li className='my-5' key={_key}>
                      <Benefits type={_key} benefitsArray={benefitsArray} />
                    </li>
                  ))}
                </ul>
                <p>Porcentaje total </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
